import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkCookie } from '../utils/cookies';
import logo from  "../assets/bardLogoVersion3.png"

function Header(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(props.response.login.response);
    if (props.response.login.response) {
      setIsSuccess(props.response.login.response.success);
    } else {
      setIsSuccess(checkCookie() != null);
    }
  }, [props.response.login])

  return (
    <div className="header">
      <div className="headerLogoContainer">
        <img src={logo} className="headerLogo"/>
        <span className="headerName">Bardic Inspiration</span>
      </div>
      <div className="headerLinks">
        <Link className="headerLink" to=''>Home</Link>
        <Link className="headerLink" to='music'>Music</Link>
        {isSuccess?
          <>
            <Link className="headerLink" to='login'>Logout</Link>
          </>
          :
          <>
            <Link className="headerLink" to='login'>Login</Link>
            <Link className="headerLink" to='register'>Register</Link>
          </>
        }
      </div>
    </div>
  )
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(Header);