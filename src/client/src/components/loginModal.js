import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';

function LoginModal(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
//  <i className="fas fa-times"></i>
  return (
    <>
    <div className="loginModalDarkness"></div>
    <div className="loginModalContainer">
        <p className="loginModalDisclaimer">To post a song, comment, or tag, you'll need to login so they can be edited later.</p>
      
        <button className="borderImage loginModalButton">Cancel</button>
        <button className="borderImage loginModalButton">Login</button>
        <button className="borderImage loginModalButton">Register</button>
    </div>
    </>
  )
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(LoginModal);