import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction, getCurrentUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';

function RegisterPage(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (requestSent) {
      if (message == "User registered.") {
        setCookie('token', props.response.register.response.token, 1);
        props.history.push('/login')
      }
    }
  }, [isSuccess])

  useEffect(() => {
    if (props.response.register.hasOwnProperty('response')) {
      setIsSuccess(props.response.register.response.success);
      setMessage(props.response.register.response.message);
    }
  }, [props.response.register.response])

  function onHandleRegistration(event) {
    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      name, email, password
    };

    props.dispatch(registerUserAction(data));

    setRequestSent(true);
  }

  return (
    <div className="registerPage">
      <div className="registerContainer">
        <h3>Register</h3>
        <div>{message}</div>
        <form onSubmit={onHandleRegistration}>
          <div className="dashboardToolLabel">
            <label htmlFor="email">Email <input className="dashboardToolInput" type="email" name="email" id="email" /></label>
          </div>
          <div className="dashboardToolLabel">
            <label htmlFor="password">Password <input className="dashboardToolInput" type="password" name="password" id="password" /></label>
          </div>
          <div>
            <button type="submit" className="btn btn-pumpkin btn-centered borderImage">Register</button>
          </div>
        </form>
        Already have an account? <Link to='login'>Login here</Link>
      </div>
    </div>
  )
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(RegisterPage);