import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkCookie } from '../utils/cookies';
import logo from "../assets/bardLogoVersion3.png"

import { postAction, turnonOverlayAction, toggleOverlayAction, turnoffOverlayAction } from '../actions/linkActions';
import { getCurrentUserAction } from '../actions/authenticationActions';
import ScrollButton from "./ScrollButton.js"

function Header(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState();
  const [message, setMessage] = useState("");
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
    setLoggedIn(checkCookie() != null)
  }, [])

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


  useEffect(() => {

    /* if(props.overlay){
       props.setOverlay(props)
     }*/
    /* if (props.response.dashboard) {
        console.log(props.store.dashboard.response);
        if (props.response.dashboard.response.message == "Successfully created new post.") {
          props.setOverlay(false);
        }
      } */
    if (props.backendData.login.user) {
      if (props.backendData.login.user.message == "User login" && props.backendData.login.user.token != undefined) {
        setIsSuccess(props.backendData.login.user.success);
      } else {
        setIsSuccess(checkCookie() != null);
      }
    }
  }, [props.backendData.login.user])
  /*
    useEffect(() => {
      console.log(props.response);
      if (props.response.dashboard.response) {
        if (props.response.dashboard.response.message == "Check sources done.") {
          setExistingSources(
            <div>
              {props.response.dashboard.response.source.map(source =>
                <li key={source._id}>
                  {source._id}
                </li>
              )}
            </div>)
        }
      }
    }, [props]) */
  // 

  function handleOverlayButton() {
    if (props.location.pathname != "/music") {
      props.history.push('/music');
    }
   props.dispatch(toggleOverlayAction());
  }

  function handleNonOverlayButton() {
    if (props.overlay) {
     props.dispatch(turnoffOverlayAction());
    }
  }

  return (
    <div className="headerContainer">
      <div className="header">
        <div className="headerLogoContainer">
          <img src={logo} className="headerLogo" />
          <span className="headerName">Bardic Inspiration</span>
        </div>
        <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
        <div className={isSuccess ? "headerLinks active" : "headerLinks"}>
          <Link onClick={() => handleNonOverlayButton()} className="headerLink" to=''>Home</Link>
          {isSuccess ?
            <>
              <i onClick={() => handleOverlayButton()} className="far fa-plus-square headerAddPost"></i>
              <i onClick={() => setShowDropdown(!showDropdown)} className={showDropdown ? "fas fa-ellipsis-h dropdownEllipsis active  " : "fas fa-ellipsis-h dropdownEllipsis"}></i>
            </>
            :
            <>
              <Link className="headerLink" to='login'>Login</Link>
              <Link className="headerLink" to='register'>Register</Link>
            </>
          }
        </div>
        {showDropdown &&
          <div ref={node} onClick={() => handleNonOverlayButton()} className="headerEllipsisDropdown">
            <div className="headerEllipsisDropdownItem">
              <Link onClick={() => setShowDropdown(false)} className="headerLink" to='login'>
                <i className="fas fa-sign-out-alt ellipsisIcon"></i>Logout
            </Link>
            </div>
          </div>
        }
        {props.overlay &&
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
        }
      </div>
    </div>
  )
}
const mapStateToProps = (backendData) => ({ backendData });
export default withRouter(connect(mapStateToProps)(Header));