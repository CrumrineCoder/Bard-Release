import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function HomePage(props) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const [tag, setTag] = useState('');

    function submitTag() {
        props.history.push({
            pathname: '/catalog',
            state: tag
        })
    }
    //state: { detail: response.data }
    return (
        <div className="homePage">
            <h1>Bardic Inspiration</h1>
            <h2>Find music for your upcoming tabletop session</h2>
            <input placeholder="Search by tag" value={tag} onChange={e => setTag(e.target.value)} ></input>
            <button onClick={submitTag}>Submit</button>
        </div>
    );
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(HomePage);