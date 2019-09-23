import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from "../assets/bardLogoVersion3.png";
function HomePage(props) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const [tag, setTag] = useState('');

    function submitTag() {
        props.history.push({
            pathname: '/music',
            state: tag
        })
    }
    //state: { detail: response.data }
    <img className="homePageLogo" src={logo} />
    return (
        <div className="flexHomePageContainer">
            <div className="homePage">
              
                <h1 className="homePageHeader">Bardic Inspiration</h1>
                <h2 className="homePageSubHeader">Find music for your upcoming tabletop session</h2>
                <input className="homePageSearchInput borderImage" placeholder="Search by tag" value={tag} onChange={e => setTag(e.target.value)} ></input>
                <button className="homePageSearchButton borderImage btn-pumpkin" onClick={submitTag}>Explore</button>
            </div>
        </div>
    );
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(HomePage);