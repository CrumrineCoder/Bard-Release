import React, { useState, useEffect, useRef } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkCookie } from '../utils/cookies';
import logo from "../assets/bardLogoVersion3.png"

function Header(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const node = useRef();

  const handleClickOutside = e => {
    console.log("clicking anywhere");
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setShowDropdown(false);
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);


  useEffect(() => {
    //  console.log(props.response.login.response);
    if (props.response.login.response) {
      setIsSuccess(props.response.login.response.success);
    } else {
      setIsSuccess(checkCookie() != null);
    }
  }, [props.response.login])
  // 
  return (
    <div className="header">
      <div className="headerLogoContainer">
        <img src={logo} className="headerLogo" />
        <span className="headerName">Bardic Inspiration</span>
      </div>
      <div className={isSuccess ? "headerLinks active" : "headerLinks"}>
        <Link className="headerLink" to=''>Home</Link>
        <Link className="headerLink" to='music'>Music</Link>
        {isSuccess ?
          <>
            <i class="far fa-plus-square headerAddPost"></i>
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
        <div ref={node} className="headerEllipsisDropdown">
          <div className="headerEllipsisDropdownItem">
            <Link onClick={() => setShowDropdown(false)} className="headerLink" to='login'>
              <i className="fas fa-times ellipsisIcon"></i>Logout
            </Link>
          </div>
        </div>
      }
    </div>
  )
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(Header);