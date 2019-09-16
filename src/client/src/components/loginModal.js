import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';

function LoginModal(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
    <div className={props.modalOpen ? "loginModalDarkness openModal" : "loginModalDarkness"} onClick={e =>props.setModalOpen(false)}></div>
    <div className={props.modalOpen ? "loginModalContainer openModal" : "loginModalContainer"}>
        <p className="loginModalDisclaimer">To post a song, comment, or tag, you'll need to login so they can be edited later.</p>
      
        <button className="borderImage loginModalButton" onClick={e => props.setModalOpen(false)}>Cancel</button>
        <button className="borderImage loginModalButton" onClick={e => props.redirect("login")}>Login</button>
        <button className="borderImage loginModalButton" onClick={e => props.redirect("register")}>Register</button>
    </div>
    </>
  )
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(LoginModal);