import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import {
  getData,
  bidNow,
  getBid,
  highestBid,
  removeItem,
  getDelivery,
} from "./../../store/middleware/Middleware";
import firebase from "firebase";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import img from "../../Images/img.jpg";
import { act } from "@testing-library/react";

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

function BidItems(props) {
  let [user, setUser] = useState("");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
      console.log(user);
    } else {
    }
  });
  let [assure, setAssure] = useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let [filter, setFilter] = useState("Electronic");
  let [bid, setBid] = useState("");
  let [a, setMvalue] = useState("");

  const handleOpen = (value) => {
    setOpen(true);
    setMvalue(value);
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
  let [Bid, setBidData] = useState("");
  useEffect(() => {
    if (props.bids.dataBid) {
      setBidData(Object.values(props.bids.dataBid));
    }
  }, [props.bids]);
  let time = new Date().toLocaleTimeString();
  let date = new Date().getTime();
  function check() {
    let bidDate = new Date(`${a.date} ${a.time}`).getTime();
    console.log(a.date);
    console.log(bidDate + " bid date");
    console.log(date + " your date");
  }
  console.log(props.highBid.highData);
  return (
    <>
      {props.data.map((value, i) => {
        return new Date(`${value.date} ${value.time}`).getTime() > date ? (
          <div className="product">
            <div
              className="ProductImage"
              style={{ backgroundImage: `url(${value.picUrl})` }}
            ></div>
            <div className="proDet">
              <p className="proName">{value.productName}</p>
              <p>{value.productDes}</p>
              <div className="bid">
                {props.highBid.highData
                  ? [
                      props.highBid.highData.map((c, k) => {
                        return c.key === value.key ? (
                          <p>
                            Highest Bid :{" "}
                            <span className="bidPrice">{c.bid}</span>
                          </p>
                        ) : null;
                      }),
                    ]
                  : null}
                <button onClick={() => [handleOpen(value), check()]}>
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        ) : null;
      })}
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
                {props.highBid.highData
                  ? [
                      props.highBid.highData.map((c, k) => {
                        return c.key === a.key ? (
                          <p>
                            Highest Bid : <br />
                            <span className="bidPrice">{c.bid}</span>
                          </p>
                        ) : null;
                      }),
                    ]
                  : null}
              </div>
              <div>
                <input
                  className="checkbox"
                  type="checkbox"
                  value="10%"
                  onChange={(ev) => {
                    setAssure(ev.target.value);
                  }}
                />
                You have to pay 10% As assurance
              </div>
              <div className="yourBid">
                <p>Place your bid</p>
                <input
                  placeholder="$"
                  onChange={(event) => setBid(event.target.value)}
                />
              </div>
              <div className="bidButton">
                <button
                  onClick={() => [
                    props.bidNow(a, bid, user),
                    props.highestBid(a, bid, user,assure),
                  ]}
                >
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
    highBid: state.highBid,
    image: state.image,
  };
};
const mapDispatchToProps = {
  getData,
  bidNow,
  getBid,
  highestBid,
  removeItem,
  getDelivery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BidItems));
