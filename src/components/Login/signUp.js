import React, { useState } from "react";
import "./Login.scss";

import firebase from "firebase";
import SignIn from "./SignIn";
import { connect } from "react-redux";
import { SignUpfn } from './../store/middleware/Middleware'
import { withRouter } from "react-router-dom";

function SignUp(props) {
  let [first, setFirst] = useState("");
  let [last, setLast] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [key,setKey]=useState(firebase.database().ref("User").push().key)
  return (
    <>
      <h2 className="textCenter">Sign Up</h2>
      <p className="textCenter">Create Your Account</p>
      <div className="inputFild">
        <input
          className="Input"
          placeholder="First Name"
          type="text"
          onChange={(event) => {
            setFirst(event.target.value);
          }}
        />
        <input
          className="Input"
          placeholder="Last Name"
          type="text"
          onChange={(event) => {
            setLast(event.target.value);
          }}
        />
        <input
          className="Input"
          placeholder="Email"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="Input"
          placeholder="Password"
          type="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="signinBtn">
          <p className="Register">
            Already Have An Account?{" "}
            <span
              onClick={() => {
                props.setSignUp(false);
              }}
            >
              Sign In Now
            </span>
          </p>
          <button 
          onClick={() => props.SignUpfn(email,password,first,last,key)}
          >Sign In</button>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = { SignUpfn };

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SignUp));

