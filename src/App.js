import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import { firebaseConfig } from "./config";
// import SignIn from "./components/Login/SignIn";
import Login from "./components/Login/Login";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Main/home";
import Navbar from "./components/Main/navbar";
import "./components/Main/main.scss";
import Auctioneer from "./components/Main/Auctioneer/Auctineer";
import Bidder from "./components/Main/Bidder/Bidder";
import YourBids from "./components/Main/Bidder/yourBid";
import Deliver from "./components/Main/Bidder/Deliver";
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function App() {
  let [User, setUser] = useState("");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
      console.log(user);
    } else {
      // No user is signed in.
    }
  });
  return (
    // <div className="body">
    <Router>
      {User ? <Navbar /> : null}
      <Route
        path="/"
        exact
        component={() => {
          return <Login />;
        }}
      />
      <Route
        path="/home"
        exact
        component={() => {
          return <Home />;
        }}
      />
      <Route
        path="/auctioneer"
        exact
        component={() => {
          return <Auctioneer />;
        }}
      />
      <Route
        path="/biddings"
        exact
        component={() => {
          return <Bidder />;
        }}
      />
      <Route
        path="/yourbids"
        exact
        component={() => {
          return <YourBids />;
        }}
      />
       <Route
        path="/deliver"
        exact
        component={() => {
          return <Deliver />;
        }}
      />
    </Router>
    //  </div>
  );
}

export default App;
