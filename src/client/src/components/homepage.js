import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function HomePage(props) {
  
  return (
    <div className="homePage">
      <h1>Bardic Inspiration</h1>
      <h2>Find music for your upcoming tabletop session</h2>
      <input placeholder="Search by tag"></input>
    </div>
  );
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(HomePage);