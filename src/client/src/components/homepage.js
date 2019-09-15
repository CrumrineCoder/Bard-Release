import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function HomePage(props) {
  
  return (
    <div className="homePage">
      <div className="homePageContainer">
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
            <button type="submit" className="btn btn-pumpkin btn-centered">Login</button>
          </div>
        </form>
        Don't have an account? <Link to='register'>Register here</Link>
      </div>
    </div>
  );
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(HomePage);