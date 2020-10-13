import firebase from "firebase";
import {
  SignUpUser,
  addItemAuc,
  getDataAuc,
  Bid,
  getBidAuc,
  HighBid,
  getHighBid,
  remove,
  getImage,
} from "./../action/UserAction";

export function SignUpfn(email, password, first, last, key) {
  return (dispatch) => {
    let userObj = {
      FirstName: first,
      LastName: last,
      Email: email,
      key: key,
    };
    console.log(`${first} ${last}`);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        return result.user
          .updateProfile({
            displayName: `${first} ${last}`,
          })
          .then(() => {
            console.log("Account Created");
          });
      })
      .then(() => {
        firebase.database().ref("User").child(key).set(userObj);
      })
      .then(() => {
        dispatch(() => SignUpUser(email, password));
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };
}
export function addItem(payload, image, e) {
  let path = "";
  return (dispatch) => {
    firebase
      .storage()
      .ref()
      .child(payload.key)
      .put(image[0])
      .then(function (snapshot) {
        snapshot.ref.getDownloadURL().then((res) => {
          path = res;
        });
      })
      .then(() => {});
    console.log(...path);
    setTimeout(() => {
      firebase
        .database()
        .ref("Auctions")
        .child(payload.categorie)
        .child(payload.key)
        .set({
          Name: payload.Name,
          productName: payload.productName,
          categorie: payload.categorie,
          productDes: payload.productDes,
          time: payload.time,
          date: payload.date,
          Bid: payload.Bid,
          key: payload.key,
          picUrl: path,
        })
        .then(() => {
          console.log("runn");
        })
        .then(() => {
          dispatch(() => addItemAuc(payload));
        });
      console.log(image);
    }, 5000);
  };
}
export function getData(filter) {
  console.log(filter);
  return (dispatch) => {
    firebase
      .database()
      .ref("Auctions")
      .child(filter)
      .on("value", function (data) {
        if (data.val()) {
          // console.log(data.val())
          dispatch(
            getDataAuc({
              data: Object.values(data.val()),
              key: Object.keys(data.val()),
            })
          );
        } else {
          dispatch(getDataAuc({ data: [] }));
        }
      });
  };
}

export function bidNow(a, bid, user) {
  var bidObj = {
    bid: bid,
    key: a.key,
    bidderName: user.displayName,
    bidderUid: user.uid,
    product: a.productName,
    owner: a.Name,
    productName: a.productName,
    categorie: a.categorie,
    productDes: a.productDes,
    time: a.time,
    date: a.date,
    picUrl: a.picUrl,
  };
  return (dispatch) => {
    firebase
      .database()
      .ref("Bids")
      // .child(a.key)
      .push(bidObj)
      .then(() => {
        dispatch(() => Bid(a, bid));
      });
  };
}
export function getBid() {
  return (dispatch) => {
    firebase
      .database()
      .ref("Bids")
      // .child(a.key)
      .on("value", function (data) {
        if (data.val()) {
          dispatch(
            getBidAuc({
              dataBid: Object.values(data.val()),
            })
          );
        } else {
          dispatch(getBidAuc({ dataBid: [] }));
        }
      });
  };
}
export function highestBid(a, bid, user,assure) {
  return (dispatch) => {
    console.log(a);

    var highestBidObj = {
      bid: bid,
      key: a.key,
      bidderName: user.displayName,
      bidderUid: user.uid,
      product: a.productName,
      owner: a.Name,
      productName: a.productName,
      categorie: a.categorie,
      productDes: a.productDes,
      time: a.time,
      date: a.date,
      picUrl: a.picUrl,
      assure: assure

    };
    firebase
      .database()
      .ref("HighestBids")
      .child(a.key)
      .set(highestBidObj)
      .then(() => {
        dispatch(() => HighBid(a, bid));
        dispatch(() => HighBid(a, bid));
      });
  };
}
export function getDelivery() {
  return (dispatch) => {
    firebase
      .database()
      .ref("HighestBids")
      .on("value", function (data) {
        if (data.val()) {
          dispatch(
            getHighBid({
              highData: Object.values(data.val()),
            })
          );
        } else {
          dispatch(getBid({ highData: [] }));
        }
      });
  };
}
export function removeItem(a) {
  return (dispatch) => {
    firebase
      .database()
      .ref("Auctions")
      .child(a.categorie)
      .child(a.key)
      .remove();
  };
}
