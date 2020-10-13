import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { getData, bidNow, getBid } from "./../../store/middleware/Middleware";
import firebase from "firebase";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import img from "../../Images/img.jpg";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "60%",
    height: "90vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function DeliverItem(props) {
  let [user, setUser] = useState("");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
      console.log(user);
    } else {
      // No user is signed in.
    }
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let [filter, setFilter] = useState("Electronic");
  let [bid, setBid] = useState("");
  let [a, setMValue] = useState("");

  const handleOpen = (value) => {
    setOpen(true);
    setMValue(value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    props.getData(filter);
  }, [filter]);

  useEffect(() => {
    props.getBid();
  }, []);
  useEffect(() => {
    if (props.bids.dataBid) {
      console.log(Object.values(props.bids.dataBid));
    }
  }, [props.bids]);
  let [Bid, setBidData] = useState("");
  useEffect(() => {
    if (props.bids.dataBid) {
      setBidData(Object.values(props.bids.dataBid));
    }
  }, [props.bids]);
  useEffect(() => {
    console.log(Bid.length);
  }, [Bid]);
  let time = new Date().toLocaleTimeString();
  let date = new Date().getTime();
  function check(value) {
    let bidDate = new Date(value.date).getTime();
    if (bidDate <= date) {
      console.log("runn");
    }
  }
  return (
    <>
      {props.data.map((value, i) => {
        return date >= new Date(value.date).getTime() &&
          value.bidderUid === user.uid ? (
          <div className="bidHistory">
            <div>
              <p>
                {" "}
                <i class="fas fa-circle"></i> You Have Won Bid On This Product (
                {value.productName}){" "}
                <span
                  className="Detail"
                  onClick={() => [handleOpen(value), check(value)]}
                >
                  See Detail
                </span>{" "} and you paid owner {value.assure} as assurance
              </p>
            </div>
          </div>
        ) : null;
      })}
      ;
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="imgBid">
              <div
                onClick={() => console.log(a)}
                className="modalPic"
                style={{ backgroundImage: `url(${a.picUrl})` }}
              ></div>
              <div className="desBid">
                <h2 id="transition-modal-title">{a.productName}</h2>
                <p id="transition-modal-description">{a.productDes}</p>
                <div className="recentBids">
                  <h5>Recent Bids</h5>
                  <div>
                    {Bid.length
                      ? [
                          Bid.map((b, j) => {
                            return a.key === b.key ? (
                              <p>
                                {b.bidderName} has bid ${b.bid} on this product
                              </p>
                            ) : null;
                          }),
                        ]
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="bidInput">
              <div className="timeSlot">
                <p>Bid Ends On</p>
                <p className="dateTime">
                  {a.date} {a.time}
                </p>
              </div>
              <div className="hiBid">
                <p>
                  Highest Bid : <p className="bidPrice">{a.Bid}</p>
                </p>
              </div>
              <div className="yourBid">
                <p>Place your bid</p>
                <input
                  placeholder="$"
                  onChange={(event) => setBid(event.target.value)}
                />
              </div>
              <div className="bidButton">
                <button onClick={() => props.bidNow(a, bid, user)}>
                  BID NOW
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    bids: state.bids,
  };
};
const mapDispatchToProps = { getData, bidNow, getBid };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeliverItem));
