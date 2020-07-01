import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUserAction, logoutUserAction } from '../actions/authenticationActions';
import { setCookie, deleteCookie } from '../utils/cookies';

function LoginPage(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  /*
    useEffect(() => {
      document.title = 'React Login';
    }, [])
  */

  useEffect(() => {
    props.dispatch(logoutUserAction());
    deleteCookie()
  }, [])

  useEffect(() => {
    if (props.store.login.user != undefined) {
      setIsSuccess(props.store.login.user.success);
      setMessage(props.store.login.user.message);
    }
  }, [props.store.login.user])

  useEffect(() => {
    if (isSuccess && props.store.login.user.success) {
      setCookie('token', props.store.login.user.token, 9999999999999999999999999999999999999999);
      //setIsSuccess(false);
      props.history.push('/')
    }
  }, [isSuccess])

  function onHandleLogin(event) {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email, password
    };

    props.dispatch(loginUserAction(data));
  }
  //  <a href="/dashboard">dashboard</a>
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h3>Login</h3>
        <div>{message}</div>
        <form onSubmit={onHandleLogin}>
          <div className="dashboardToolLabel">
            <label htmlFor="email">Email <input className="dashboardToolInput" type="email" name="email" id="email" /></label>
          </div>
          <div className="dashboardToolLabel">
            <label htmlFor="password">Password <input className="dashboardToolInput" type="password" name="password" id="password" /></label>
          </div>
          <div>
            <button type="submit" className="btn btn-pumpkin btn-centered borderImage">Login</button>
          </div>
        </form>
        Don't have an account? <Link to='register'>Register here</Link>
      </div>
    </div>
  );
}
const mapStateToProps = (store) => ({ store });
export default connect(mapStateToProps)(LoginPage);