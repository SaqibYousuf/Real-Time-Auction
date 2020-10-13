import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import img from "../../Images/img.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { getData, getDelivery } from "./../../store/middleware/Middleware";
import BidItems from "./bidItem";

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

function Bidder(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let [filter, setFilter] = useState("Electronic");
  let [bid, setBid] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    props.getData(filter);
  }, [filter]);

  useEffect(() => {
    props.getDelivery();
  }, []);
  useEffect(() => {
    if (props.highBid.highData) {
      console.log(props.highBid.highData);
    }
  }, [props.highBid]);

  return (
    <div className="bidder">
      <div className="catogories">
        <div className="list">
          <div className="cat">
            <p onClick={(event) => setFilter(event.target.textContent)}>
              Electronic
            </p>
          </div>
          <div className="cat">
            <p onClick={(event) => setFilter(event.target.textContent)}>
              Vehicles
            </p>
          </div>
          <div className="cat">
            <p onClick={(event) => setFilter(event.target.textContent)}>
              Property
            </p>
          </div>
        </div>
      </div>
      <div className="bidProducts">
        <h3>{filter}</h3>
        <div className="bidItems">
          {props.user.data
            ? [
                Object.values(props.user.data).length ? (
                  <BidItems
                    higherBid={props.highBid.highData}
                    data={props.user.data}
                  />
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
    highBid: state.highBid,
  };
};
const mapDispatchToProps = { getData, getDelivery };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Bidder));
