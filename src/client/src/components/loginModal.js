import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';

function LoginModal(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="loginModalContainer">
        <p className="loginModalDisclaimer">To post a song, comment, or tag, you'll need to login so they can be edited later.</p>
        <i className="fas fa-times"></i>
        <button>Cancel</button>
        <button>Login</button>
        <button>Register</button>
    </div>
  )
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(LoginModal);