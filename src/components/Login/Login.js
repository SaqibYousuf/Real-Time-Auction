import React, { useState } from "react";
import firebase from "firebase";
import SignIn from "./SignIn";
import SignUp from "./signUp";
import { withRouter } from "react-router-dom";

function Login(props) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     props.history.push("/home")
      
    } else {
    }
  });
  let [signup, setSignUp] = useState(false);
  return (
    <div className="body">
      <div className="SigninBody">
        <div className="Signin">
          <h1>Auction Application</h1>
          <div className="SignInContent">
            <div className="lottie">
              <lottie-player
                className="hammerLottie"
                src={
                  "https://assets7.lottiefiles.com/private_files/lf30_KUbmMp.json"
                }
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
            <div className="fields">
              {!signup ? (
                <SignIn setSignUp={setSignUp} />
                ) : (
                  <SignUp setSignUp={setSignUp} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
