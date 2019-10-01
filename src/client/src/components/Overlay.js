
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkCookie } from '../utils/cookies';
import logo from "../assets/bardLogoVersion3.png"

import { postAction, turnonOverlayAction, toggleOverlayAction, turnoffOverlayAction } from '../actions/linkActions';
import { getCurrentUserAction } from '../actions/authenticationActions';
import ScrollButton from "./ScrollButton.js"

function Overlay(props) {
    
    const [showDropdown, setShowDropdown] = useState(false);
    const [existingSources, setExistingSources] = useState("");
    const [source, setSource] = useState("");
    const node = useRef();



    function onHandlePost(event) {
        event.preventDefault();

        let link = event.target.link.value;

        //let videoID = link.split('v=')[1];


        // console.log("https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=" + videoID);

        let source = event.target.source.value;
        let name = event.target.name.value;

        const data = {
            link,
            source,
            name
        };
        props.dispatch(postAction(data));
    }

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setShowDropdown(false);
    };

    useEffect(() => {
        props.dispatch(getCurrentUserAction())
    }, [])

    useEffect(() => {
        console.log(props);
        if(props.backendData.overlay.response){
            setShowDropdown(props.backendData.overlay.response.overlay);
        }
    }, [props.backendData.overlay])

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <Fragment>
            {showDropdown &&
                <Fragment>
                <div className="dashboardTool postNewSongModal borderImage">
                    <h3 className="dashboardToolHeader">Post a new song</h3>
                    <form onSubmit={onHandlePost}>
                        <div className="dashboardToolLabel">
                            <label htmlFor="link">Link <input required placeholder="https://www.youtube.com/watch?v=J5FFDj7vH6E" className="dashboardToolInput borderImage" autoComplete="off" type="link" name="link" id="link" />
                            </label>
                        </div>
                        <div className="dashboardToolLabel">
                            <label htmlFor="source">Source <input required placeholder="Chrono Trigger" className="dashboardToolInput borderImage" autoComplete="off" value={source} onChange={e => setSource(e.target.value)} type="source" name="source" id="source" />
                            </label>
                        </div>
                        <div className="dashboardToolLabel">
                            <label htmlFor="name">Name <input required placeholder="Frog's Theme" className="dashboardToolInput borderImage" autoComplete="off" type="name" name="name" id="name" />
                            </label>
                        </div>
                        <div>
                            <button className="btn btn-post btn-centered borderImage" type="submit">Post Song</button>
                        </div>
                    </form>
                    {existingSources}
                </div>
                <div onClick={()=>{setShowDropdown(false)}} className="overlayYellow"></div>
                </Fragment>
            }
        </Fragment>
    )
}
const mapStateToProps = (backendData) => ({ backendData });
export default withRouter(connect(mapStateToProps)(Overlay));