import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkCookie } from '../utils/cookies';
import logo from "../assets/bardLogoVersion3.png"

import { postAction, turnonOverlayAction, toggleOverlayAction, turnoffOverlayAction } from '../actions/linkActions';
import { getCurrentUserAction } from '../actions/authenticationActions';
import ScrollButton from "./ScrollButton.js"

import { Link as ScrollLink} from "react-scroll";

function Header(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    props.dispatch(getCurrentUserAction())
    setLoggedIn(checkCookie() != null)
  }, [])

  useEffect(() => {
    if (props.backendData.login.user) {
  //    console.log(props.backendData.login.user)
      if (props.backendData.login.user.token != undefined) {
        setIsSuccess(props.backendData.login.user.success);
      } else {
        setIsSuccess(checkCookie() != null);
      }
    }
  }, [props.backendData.login.user])

  function handleOverlayButton() {
    /*if (props.location.pathname != "/music") {
      props.history.push('/music');
    } */
    props.dispatch(toggleOverlayAction());
  }

  function handleNonOverlayButton() {
    if (props.overlay) {
      props.dispatch(turnoffOverlayAction());
    }
  }

  return (
    <div className="headerContainer">
      <div className="header">
        <div className="headerLogoContainer">
          <img src={logo} className="headerLogo" />
          <span className="headerName">Bardic Inspiration</span>
        </div>
        <ScrollLink
          activeClass="active"
          to="searchBar"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="scrollContainer"
        >
            <i className="fas fa-arrow-circle-up scrollToTopHeaderButton"></i>
            <span className="scrollContainerText">Back to Top</span>
        </ScrollLink>
        <div className={isSuccess ? "headerLinks active" : "headerLinks"}>

          <Link onClick={() => handleNonOverlayButton()} className={isSuccess ? "headerLink lastHeaderLink" : "headerLink"} to=''>Home</Link>

          {isSuccess ?
            <>
              <i onClick={() => handleOverlayButton()} className="far fa-plus-square headerAddPost"></i>
              <i onClick={() => setShowDropdown(!showDropdown)} className={showDropdown ? "fas fa-ellipsis-h dropdownEllipsis active  " : "fas fa-ellipsis-h dropdownEllipsis"}></i>
            </>
            :
            <>
              <Link className="headerLink" to='login'>Login</Link>
              <Link className="headerLink" to='register'>Register</Link>
            </>
          }
        </div>
        {showDropdown &&
          <div onClick={() => handleNonOverlayButton()} className="headerEllipsisDropdown">
            <div className="headerEllipsisDropdownItem">
              <Link onClick={() => setShowDropdown(false)} className="headerLink" to='login'>
                <i className="fas fa-sign-out-alt ellipsisIcon"></i>Logout
            </Link>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
const mapStateToProps = (backendData) => ({ backendData });
export default withRouter(connect(mapStateToProps)(Header));