import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllTagsAction } from '../actions/linkActions';

function HomePage(props) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const [tag, setTag] = useState('');
    const [recommendedTags, setRecommendedTags] = useState([]);

    function submitTag(tag) {
        props.history.push({
            pathname: '/music',
            state: tag
        })
    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    useEffect(() => {
        const data = {
            searchTag: ""
        };
        props.dispatch(getAllTagsAction(data));
    }, [])

    useEffect(() => {
        console.log(props);
    }, [props])

    useEffect(() => {
        if (props.response.dashboard.response != undefined) {
            if (props.response.dashboard.response.message == "Check tags done.") {
                if (props.response.dashboard.response.tag.length > 0) {
                    let returnedArray = shuffle(props.response.dashboard.response.tag);
                    setRecommendedTags(returnedArray);
                }
            }
        }
    }, [props.response.dashboard.response])

    return (
        <div className="flexHomePageContainer">
            <div className="homePage">

                <h1 className="homePageHeader">Bardic Inspiration</h1>
                <h2 className="homePageSubHeader">Find music for your upcoming tabletop session</h2>
                <input className="homePageSearchInput borderImage" placeholder="Search by tag" value={tag} onChange={e => setTag(e.target.value)} ></input>
                {recommendedTags.slice(0, 5).map(
                    function (tag) {
                        return (
                            <li className="tagBubble borderImage smallTagBubble editableTagBubble" onClick={()=>{submitTag(tag._id)}} key={tag._id}>
                                {tag._id}
                                <i className="fas fa-plus iconAction"></i>
                            </li>
                        )
                    }
                )}
                <button className="homePageSearchButton borderImage btn-pumpkin" onClick={submitTag}>Explore</button>
            </div>
        </div>
    );
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(HomePage);