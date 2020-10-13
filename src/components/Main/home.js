import React from "react";
import firebase from "firebase";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";

function Home(props) {
  return (
    <div className="body">
      <div className="Home">
        <div className="modeDiv">
          <div
            onClick={() => {
              props.history.push("/auctioneer");
            }}
            className="Mode"
          >
            <h3>Click To Continue As</h3>
            <h2>Auctioneer</h2>
          </div>
          <div
            onClick={() => {
              props.history.push("/biddings");
            }}
            className="Mode"
          >
            <h3>Click To Continue As</h3>
            <h2>Bidder</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Home);
