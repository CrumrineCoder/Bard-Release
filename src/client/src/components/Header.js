import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkCookie } from '../utils/cookies';

function Header(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (props.response.login.response) {
      setIsSuccess(props.response.login.response.success);
    } else {
      setIsSuccess(checkCookie() != null);
    }
  }, [props.response.login])

  return (
    <div className="header">
      {isSuccess ?
        <>
          <Link className="headerLink" to='dashboard'>Dashboard</Link>
          <Link className="headerLink" to='login'>Logout</Link>
        </>
        :
        <>
          <Link className="headerLink" to='login'>Login</Link>
          <Link className="headerLink" to='register'>Register</Link>
        </>
      }

    </div>
  )
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(Header);