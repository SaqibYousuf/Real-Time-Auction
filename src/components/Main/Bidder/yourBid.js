import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import img from "../../Images/img.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { getData, getBid } from "./../../store/middleware/Middleware";
import YourBidItems from "./yourBidItems";

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

function YourBids(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let [filter, setFilter] = useState("Electronic");
  let [bid, setBid] = useState("");
  useEffect(() => {
    props.getBid();
  }, []);

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
    if (props.user.data) {
      console.log(Object.values(props.user.data));
    }
  }, [props.user]);

  return (
    <div className="bidder">

      <div className="YourbidProducts bidProducts">
        <h3>Your Recent Bids</h3>
        <div className="bidItems">
          {props.bids.dataBid
            ? [
                Object.values(props.bids.dataBid).length ? (
                  <YourBidItems data={props.bids.dataBid} />
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
  };
};
const mapDispatchToProps = { getData, getBid };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(YourBids));
