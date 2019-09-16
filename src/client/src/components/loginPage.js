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
    if (props.response.login.response != undefined) {
      setIsSuccess(props.response.login.response.success);
      setMessage(props.response.login.response.message);
    }
  }, [props.response.login.response])

  useEffect(() => {
    if (isSuccess && props.response.login.response.success) {
      setCookie('token', props.response.login.response.token, 1);
      //setIsSuccess(false);
      props.history.push('/music')
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
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(LoginPage);