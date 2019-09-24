import React, { useState, useEffect, useRef } from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkCookie } from '../utils/cookies';
import logo from "../assets/bardLogoVersion3.png"

import { postAction } from '../actions/linkActions';
import { getCurrentUserAction } from '../actions/authenticationActions';

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
    if (props.store.login.user) {
      if (props.store.login.user.message == "User login" && props.store.login.user.token != undefined) {
        setIsSuccess(props.store.login.user.success);
      } else {
        setIsSuccess(checkCookie() != null);
      }
    }
  }, [props.store.login.user])
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
  return (
    <div className="header">
      <div className="headerLogoContainer">
        <img src={logo} className="headerLogo" />
        <span className="headerName">Bardic Inspiration</span>
      </div>
      <div className={isSuccess ? "headerLinks active" : "headerLinks"}>
        <Link className="headerLink" to=''>Home</Link>
        <Link className="headerLink" to='music'>Music</Link>
        {isSuccess ?
          <>
            <i onClick={()=> props.setOverlay(!props.overlay)} class="far fa-plus-square headerAddPost"></i>
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
        <div ref={node} className="headerEllipsisDropdown">
          <div className="headerEllipsisDropdownItem">
            <Link onClick={() => setShowDropdown(false)} className="headerLink" to='login'>
              <i className="fas fa-times ellipsisIcon"></i>Logout
            </Link>
          </div>
        </div>
      }
      {isSuccess ? props.overlay && 
        <div className="dashboardTool borderImage">
          <h3 className="dashboardToolHeader">Post a new song</h3>
          <form onSubmit={onHandlePost}>
            <div className="dashboardToolLabel">
              <label htmlFor="link">Link <input placeholder="https://www.youtube.com/watch?v=J5FFDj7vH6E" className="dashboardToolInput borderImage" autoComplete="off" type="link" name="link" id="link" />
              </label>
            </div>
            <div className="dashboardToolLabel">
              <label htmlFor="source">Source <input placeholder="Chrono Trigger" className="dashboardToolInput borderImage" autoComplete="off" value={source} onChange={e => setSource(e.target.value)} type="source" name="source" id="source" />
              </label>
            </div>
            <div className="dashboardToolLabel">
              <label htmlFor="name">Name <input placeholder="Frog's Theme" className="dashboardToolInput borderImage" autoComplete="off" type="name" name="name" id="name" />
              </label>
            </div>
            <div>
              <button className="btn btn-post btn-centered borderImage" type="submit">Post Song</button>
            </div>
          </form>
          {existingSources}
        </div>
        : <button className="btn-post loginPromptButton borderImage" onClick={e => setModalOpen(true)}>Add a Song</button>}

    </div>
  )
}
const mapStateToProps = (store) => ({ store });
export default connect(mapStateToProps)(Header);