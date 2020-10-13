import React from "react";
import firebase from "firebase";
import { Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import "./main.scss";

function Navbar(props) {
  function SignOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        alert("Sign-out successful");
      })
      .catch(function (error) {});
  }
  return (
    <div className="NavBar">
      <div className="heading">
        <h2>Auction Applicatiosn </h2>
      </div>
      <div className="navMenu">
        <div
          onClick={() => {
            props.history.push("/deliver");
          }}
          className="navLink"
        >
          <i class="fas fa-truck"></i>
          <p>Deliverd</p>
        </div>
        <div
          onClick={() => {
            props.history.push("/biddings");
          }}
          className="navLink"
        >
          <i class="fas fa-gavel"></i>
          <p>Bidding</p>
        </div>
        <div
          onClick={() => {
            props.history.push("/yourbids");
          }}
          className="navLink"
        >
          <i class="fas fa-money-bill-wave"></i>
          <p>Your Bids</p>
        </div>
        <div
          onClick={() => props.history.push("/auctioneer")}
          className="navLink"
        >
          <i class="fas fa-toggle-on"></i>
          <p>Switch Mode</p>
        </div>
        <div onClick={() => SignOut()} className="navLink">
          <i class="fas fa-sign-out-alt"></i>
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Navbar);
