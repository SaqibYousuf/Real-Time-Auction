import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import img from "../../Images/img.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import {
  getData,
  getBid,
  getDelivery,
} from "./../../store/middleware/Middleware";
import YourBidItems from "./yourBidItems";
import DeliverItem from "./DeliverItem";

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

function Deliver(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let [filter, setFilter] = useState("Electronic");
  let [bid, setBid] = useState("");

  useEffect(() => {
    props.getBid();
    props.getDelivery();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (props.highBid.highData) {
      console.log(Object.values(props.highBid.highData));
    }
  }, [props.highBid]);

  return (
    <div className="bidder">
      <div className="YourbidProducts bidProducts">
        <h3>Your Delivered Bids</h3>
        <div className="bidItems">
          {props.highBid.highData
            ? [
                Object.values(props.highBid.highData).length ? (
                  <DeliverItem data={props.highBid.highData} />
                ) : null,
              ]
            : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    bids: state.bids,
    highBid: state.highBid,
  };
};
const mapDispatchToProps = { getData, getBid, getDelivery };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Deliver));
