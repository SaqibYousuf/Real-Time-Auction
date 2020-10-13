import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import ImageUploader from "react-images-upload";
import { addItem } from "./../../store/middleware/Middleware";
import { connect } from "react-redux";

function Auctioneer(props) {
  // console.log(firebase.auth())
  const [pictures, setPictures] = useState([]);
  let [key, setKey] = useState(firebase.database().ref("Auction").push().key);

  const onDrop = (picture) => {
    setPictures([...pictures, picture]);
  };
  let [name, setName] = useState("");
  let [productName, setProductName] = useState("");
  let [categorie, setCategorie] = useState("");
  let [productDes, setProductDes] = useState("");
  let [time, setTime] = useState("");
  let [date, setDate] = useState("");
  let [Bid, setBid] = useState("");
  // let [image, setImage] = useState("");
  let [baseImage, setBaseImage] = useState("");

  let aucObj = {
    Name: name,
    productName: productName,
    categorie: categorie,
    productDes: productDes,
    time: time,
    date: date,
    Bid: Bid,
    key: key,
    picUrl: "",
  };
  const uploadImage = async (e) => {
    const file = e[0];
    console.log(e);

    var reader = new FileReader();

    setBaseImage(e);
  };
  useEffect(() => {
    console.log(baseImage);
  }, [baseImage]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="auctioneer body">
      <div className="auctionForm body">
        <h3>Fill this Form to post you item for Auction</h3>
        <div className="aucform">
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="aucInput"
            type="text"
            placeholder="Your Name"
          />
          <input
            onChange={(event) => {
              setProductName(event.target.value);
            }}
            className="aucInput"
            type="text"
            placeholder="Product Name"
          />
          <select
            onChange={(event) => {
              setCategorie(event.target.value);
            }}
            className="aucInput"
          >
            <option>Select a categories</option>
            <option>Electronic</option>
            <option>Property</option>
            <option>Vehicles</option>
            {/* <option></option>
            <option></option> */}
          </select>
          <textarea
            onChange={(event) => {
              setProductDes(event.target.value);
            }}
            className="aucInput"
            type="text"
            placeholder="Product Discription"
          />
          <ImageUploader
            className="imgUpload"
            {...props}
            type="file"
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            onChange={(ev) => uploadImage(ev)}
          />
          <input
            onChange={(event) => {
              setTime(event.target.value);
            }}
            className="aucInput"
            type="Time"
            placeholder="Time Slot"
          />
          <input
            onChange={(event) => {
              setDate(event.target.value);
            }}
            className="aucInput"
            type="date"
          />
          <input
            onChange={(event) => {
              setBid(event.target.value);
            }}
            className="aucInput"
            type="text"
            placeholder="First Bidding Ammount"
          />
          <button
            className="aucBtn"
            onClick={(e) => [
              props.addItem(aucObj, baseImage, e),
              e.preventDefault(),
            ]}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    // user: state.user,
  };
};
const mapDispatchToProps = { addItem };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Auctioneer));
