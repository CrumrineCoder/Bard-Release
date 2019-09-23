import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { postAction, getAllPostsAction, searchPostsByTag, getPostsByIDAction, checkTagsAction, checkSourcesAction } from '../actions/linkActions';

import Post from "./Post";
import LoginModal from "./loginModal"

import tagCategories from "../utils/tagCategories";
import { checkCookie } from '../utils/cookies';
import { getCurrentUserAction } from '../actions/authenticationActions';


function MusicPage(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [postsContent, setPostsContent] = useState("");
  const [filteredPosts, setFilteredPosts] = useState("");
  const [unfilteredPosts, setUnfilteredPosts] = useState("");
  const [generalTags, setGeneralTags] = useState("");
  const [specificTags, setSpecificTags] = useState("");
  const [existingTags, setExistingTags] = useState("");
  const [existingSources, setExistingSources] = useState("");
  const [source, setSource] = useState("");
  const [excludeSource, setExcludeSource] = useState("");
  const [includeSource, setIncludeSource] = useState("");
  const [loggedIn, setLoggedIn] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("")

  useEffect(() => {
    let searchTag;
    searchTag = specificTags.split(",");
    if (specificTags.length >= 1) {
      searchTag = searchTag[searchTag.length - 1].toLowerCase().trim()
    } else {
      searchTag = specificTags.toLowerCase().trim()
    }
    if (searchTag.length > 0) {
      const data = {
        searchTag
      };
      props.dispatch(checkTagsAction(data));
    } else {
      setExistingTags(<></>);
    }
  }, [specificTags])

  useEffect(() => {
    let searchSource = source;
    if (searchSource.length > 0) {
      const data = {
        searchSource
      };
      props.dispatch(checkSourcesAction(data));
    }
  }, [source])

  useEffect(() => {
    props.dispatch(getCurrentUserAction())
    if (props.location.state) {
      setSpecificTags(props.location.state)
      onSearchTag()
    }
    setLoggedIn(checkCookie() != null)
    props.dispatch(getAllPostsAction())
  }, [])

  useEffect(() => {
    if (props.response.login.response) {
      setCurrentUser(props.response.login.response.user);
    }
  }, [props.response.login.response])

  useEffect(() => {
    //console.log(props.response.dashboard.response);
    if (filteredPosts && unfilteredPosts) {
      //   console.log(filteredPosts);
      //  console.log(unfilteredPosts);
      // To do, filter unfilteredposts by name to be added for the song name. 
      // index={unfilteredPosts.indexOf(post)} 
      // postID={post}
      //  comment={props.response.dashboard.response.comment}
      let postsToTransform = unfilteredPosts;
      let finalizedPosts = postsToTransform;
      if (includeSource) {
        let include = includeSource.split(",")
        include = include.map(str => str.replace(/\s/g, ''));
        include = include.map(function (x) { return x.toLowerCase() })
        finalizedPosts = postsToTransform.filter(function (post) {
          return include.indexOf(post.source.replace(" ", "").toLowerCase()) != -1
        })
      }
      if (excludeSource) {
        let exclude = excludeSource.split(",")
        exclude = exclude.map(str => str.replace(/\s/g, ''));
        exclude = exclude.map(function (x) { return x.toLowerCase() })
        finalizedPosts = postsToTransform.filter(function (post) {
          return exclude.indexOf(post.source.replace(" ", "").toLowerCase()) == -1
        })
      }
      if (props.response.dashboard.response) {
        if (props.response.dashboard.response.message == "Successfully created new post.") {
          setPostsContent(
            <div>suck</div>
          )
        }
        else {
          if (props.response.dashboard.response.message == "Search by tag done." && props.response.dashboard.response.tag.length == 0) {
            setPostsContent(
              <h1 className="noPostsDisclaimer">There are no posts to display for this search.</h1>
            )
          } else if (props.response.dashboard.response.message != "Check sources done." && props.response.dashboard.response.message != "Check tags done.") {
            if (finalizedPosts.length == 0) {
              setPostsContent(
                <h1 className="noPostsDisclaimer">There are no posts to display for this search and filter.</h1>
              )
            } else {
              setPostsContent(
                <div className="posts">
                  {finalizedPosts.map(post =>
                    <Post currentUser={currentUser} setModalOpen={setModalOpen} post={post} key={post._id} loggedIn={loggedIn}></Post>
                  )}
                </div>
              )
            }
          }

        }
      }
    }
  }, [filteredPosts, props.response.dashboard.response, excludeSource, includeSource])

  useEffect(() => {
    if (props.response.dashboard.response != undefined) {
      setIsSuccess(props.response.dashboard.response.success);
      setMessage(props.response.dashboard.response.message);
      if (props.response.dashboard.response.post) {
        setUnfilteredPosts(props.response.dashboard.response.post)
        //  console.log(props.response.dashboard.response.post);
        setFilteredPosts(props.response.dashboard.response.post.map(post => post.link.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")))
        /*
         {filteredPosts.map(post => <iframe id="ytplayer" type="text/html" width="640" height="360"
               src={post}
               frameBorder="0" key={post}></iframe>)}
               */
      } else if (props.response.dashboard.response.message == "Search by tag done.") {
        //   console.log("HEYA HERE'S THE TAGS", props.response.dashboard.response.tag);

        let postIDs = props.response.dashboard.response.tag.map(function (a) {
          return a.postID
        });
        //    console.log(postIDs);
        if (postIDs.length > 0) {
          props.dispatch(getPostsByIDAction(postIDs));
        } // else do something
        // Now we have the post IDs, we have to find all posts by ID. 
      } else if (props.response.dashboard.response.message == "Check tags done.") {

        setExistingTags(
          <div>
            {props.response.dashboard.response.tag.map(tag =>
              <li>
                {tag._id}
              </li>
            )}
          </div>)
      } else if (props.response.dashboard.response.message == "Successfully created new post.") {
        props.dispatch(getAllPostsAction());
      } else if (props.response.dashboard.response.message == "Check sources done.") {
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
  }, [props.response.dashboard.response])


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
  /*
    function onHandleCheck(event) {
      event.preventDefault();
  
      let searchTag = event.target.searchTag.value;
      if (searchTag.length > 0) {
        const data = {
          searchTag
        };
        props.dispatch(checkTagsAction(data));
      }
    }
  */
  function onSearchTag(event) {
    let exclusiveTags;

    if (event) {
      event.preventDefault();

      exclusiveTags = event.target.searchTag.value;
    } else {
      exclusiveTags = props.location.state;
    }
    if (exclusiveTags.indexOf(",") > - 1) {
      exclusiveTags = exclusiveTags.split(",");
    } else {

      let searchString = exclusiveTags;
      exclusiveTags = [];
      searchString = searchString.toLowerCase();
      exclusiveTags.push(searchString);
    }

    exclusiveTags = exclusiveTags.map(str => str.replace(/\s/g, ''));
    exclusiveTags = exclusiveTags.filter(Boolean);

    let inclusiveTags = [];
    let compareTags;
    if (generalTags.length > 0) {

      if (generalTags.indexOf(",") > - 1) {
        compareTags = generalTags.split(",");
      } else {
        compareTags = [];
        compareTags.push(generalTags);
      }
      compareTags = compareTags.map(str => str.replace(/\s/g, ''));
      let categories = [];

      for (var tagCategory in tagCategories) {
        let tagValues = tagCategories[tagCategory];
        for (var i = 0; i < compareTags.length; i++) {
          if (tagValues.indexOf(compareTags[i]) > -1 || compareTags[i] == tagCategory) {
            categories.push(tagCategory);
            categories.push(tagCategories[tagCategory]);
            categories = categories.flat(Infinity);
          }
        }
      }
      inclusiveTags.push(categories);
      inclusiveTags = inclusiveTags.flat(Infinity);
    }

    inclusiveTags = inclusiveTags.filter(function (str) {
      return /\S/.test(str);
    });

    inclusiveTags = inclusiveTags.filter(Boolean);

    if (exclusiveTags.length > 0 || inclusiveTags.length > 0) {
      const data = {
        inclusiveTags,
        exclusiveTags
      }
      props.dispatch(searchPostsByTag(data))
      /* const data = {
         searchTag
       };
       console.log(data);
       props.dispatch(searchPostsByTag(data)); */
    }

  }

  function clear() {
    props.dispatch(getAllPostsAction())
    setSpecificTags("")
    setGeneralTags("")
  }

  function redirect(location) {
    props.history.push(location);
  }
  /*
    <form onSubmit={onHandleCheck}>
        <div>
          <label htmlFor="searchTag">Check if tag already exists</label>
          <input type="searchTag" name="searchTag" id="searchTag" />
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
      */
  //       <a href="/login">Login</a>
  //      <p>{message}</p>
  return (
    <div>
      <div className="musicSearchBar">
          <i class="fas fa-search"></i>
          <input className="dashboardToolInput borderImage" placeholder="Search by tag" autoComplete="off" value={specificTags} onChange={e => setSpecificTags(e.target.value)} type="searchTag" name="searchTag" id="searchTag" />     
      </div>
      <div className="dashboardToolsContainer">
        <div className="dashboardTool borderImage">
          <h3 className="dashboardToolHeader">Exclude and Include Sources</h3>
          <div className="dashboardToolLabel">
            <label htmlFor="excludeSource">Exclude Sources (separated by commas) <input className="dashboardToolInput borderImage" autoComplete="off" type="excludeSource" name="excludeSource" id="excludeSource" value={excludeSource}
              onChange={e => setExcludeSource(e.target.value)} />
            </label>
          </div>
          <div className="dashboardToolLabel">
            <label htmlFor="includeSource">Include Sources (separated by commas) <input className="dashboardToolInput borderImage" autoComplete="off" type="includeSource" name="includeSource" id="includeSource" value={includeSource}
              onChange={e => setIncludeSource(e.target.value)} />
            </label>
          </div>
        </div>
        <div className="dashboardTool borderImage">
          <h3 className="dashboardToolHeader">Search by Tags</h3>
          <div className="dashboardToolLabel">
            <label htmlFor="generalSearchTag">Search by categorical tags (separated by commas) <input className="dashboardToolInput borderImage" autoComplete="off" type="generalSearchTag" name="generalSearchTag" id="generalSearchTag" value={generalTags}
              onChange={e => setGeneralTags(e.target.value)} />
            </label>
          </div>
          <form onSubmit={onSearchTag}>
            <div className="dashboardToolLabel">
              <label htmlFor="searchTag">Search by tags (separated by commas) <input className="dashboardToolInput borderImage" autoComplete="off" value={specificTags} onChange={e => setSpecificTags(e.target.value)} type="searchTag" name="searchTag" id="searchTag" />
              </label>
            </div>
            <div className="btnSearchContainer">
              <button className="btn btn-pumpkin borderImage" type="submit">Search</button>
              <button className="btn btn-vermillion borderImage" onClick={clear}>Clear</button>
            </div>
          </form>
          {existingTags}
        </div>
        {loggedIn ?
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
      <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} redirect={redirect}></LoginModal>
      <div>
        {postsContent}
      </div>
    </div >
  );
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(MusicPage);