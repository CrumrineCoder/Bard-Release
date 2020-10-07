import React, {  } from 'react';


function LoginModal(props) {
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
export default (LoginModal);