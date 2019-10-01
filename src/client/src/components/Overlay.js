
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { postAction, turnoffOverlayAction } from '../actions/linkActions';
import { getCurrentUserAction } from '../actions/authenticationActions';

function Overlay(props) {
    
    const [showDropdown, setShowDropdown] = useState(false);
    const [existingSources, setExistingSources] = useState("");
    const [source, setSource] = useState("");

    function onHandlePost(event) {
        event.preventDefault();

        let link = event.target.link.value;
        let source = event.target.source.value;
        let name = event.target.name.value;

        const data = {
            link,
            source,
            name
        };
        props.dispatch(postAction(data));
    }

    useEffect(() => {
        props.dispatch(getCurrentUserAction())
    }, [])

    useEffect(() => {
        if(props.backendData.overlay.response){
            setShowDropdown(props.backendData.overlay.response.overlay);
        }
    }, [props.backendData.overlay])


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
                <div onClick={()=>{props.dispatch(turnoffOverlayAction())}} className="overlayYellow"></div>
                </Fragment>
            }
        </Fragment>
    )
}
const mapStateToProps = (backendData) => ({ backendData });
export default withRouter(connect(mapStateToProps)(Overlay));