import React from "react";
import "./Login.scss";

import firebase from "firebase";

function SignIn(props) {
  return (
    <>
    <h2 className="textCenter">Sign In</h2>
    <p className="textCenter">Sign In With Existing Account</p>
    <div className="inputFild">
      <input className="Input" placeholder="Email" type="email" />
      <input className="Input" placeholder="Password" type="Password" />
      <div className="signinBtn">
        <p className='Register'>Doesn't have account? <span onClick={()=>{
         props.setSignUp(true)
        }}>Register Now</span></p>
      <button>Sign In</button>
      </div>
    </div>
    </>
  );
}

export default SignIn;
