import React, { useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
  const [existingSources, setExistingSources] = useState("");
  const [source, setSource] = useState("");
  const [excludeSource, setExcludeSource] = useState("");
  const [includeSource, setIncludeSource] = useState("");
  const [loggedIn, setLoggedIn] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const [searchTags, setSearchTags] = useState([]);
  const [tagToAdd, setTagToAdd] = useState("");

  //const [existingTags, setExistingTags] = useState("");

  const [autocompleteTagsLength, setAutocompleteTagsLength] = useState(0);
  const [autocompleteTags, setAutocompleteTags] = useState("");

  const [suggestedTags, setSuggestedTags] = useState([]);

  const [sources, setSources] = useState([]);
  const [blacklist, setBlacklist] = useState([]);

  const [renderSources, setRenderSources] = useState();

  /*
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
  */

  useEffect(() => {
    let searchTag = tagToAdd.toLowerCase().trim();
    if (searchTag) {
      const data = {
        searchTag
      };
      props.dispatch(checkTagsAction(data));
    } else {
      setAutocompleteTagsLength(0);
      setAutocompleteTags(<></>);
    }
  }, [tagToAdd])

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
      //  setSpecificTags(props.location.state)
      onSearchTag(props.location.state)
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
      console.log(finalizedPosts);
      setSources(finalizedPosts.map(a => a.source));

      finalizedPosts = finalizedPosts.filter(function (post) {
        return blacklist.indexOf(post.source) == -1;
      })

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
  }, [filteredPosts, props.response.dashboard.response, excludeSource, includeSource, blacklist])

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
        /*
        setSuggestedTags(
            <ul>
              {props.response.dashboard.response.tag.map(tag =>
                <li className="tagSuggestions" onClick={() => { onSearchTag(tag._id) }}>
                  {tag._id}
                  <i className="fas fa-plus tagBubbleIcon"></i>
                </li>
              )}
            </ul>)
            */
        setAutocompleteTagsLength(props.response.dashboard.response.tag.length);
        setAutocompleteTags(
          <ul className="tagSuggestionsContainer borderImage">
            {props.response.dashboard.response.tag.map(tag =>
              <li className="tagSuggestion" onClick={() => { onSearchTag(tag._id) }}>
                {tag._id}
              </li>
            )}
          </ul>)
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
  function onSearchTag(tag) {
    let localTagToAdd;
    tag != undefined ? localTagToAdd = tag : localTagToAdd = tagToAdd;
    let newTags = searchTags;
    // props.location.state != undefined ? newTag.push(props.location.state) : newTag.push(localTagToAdd);
    newTags.push(localTagToAdd);
    let checkTags = newTags.map(str => str.replace(/\s/g, ''));
    checkTags = checkTags.filter(Boolean);
    if (checkTags.length) {
      setSearchTags(newTags);
      setTagToAdd("")
      props.dispatch(searchPostsByTag(newTags));

      let categories = [];
      let inclusiveTags = [];

      for (var tagCategory in tagCategories) {
        let tagValues = tagCategories[tagCategory];
        for (var i = 0; i < newTags.length; i++) {
          if (tagValues.indexOf(newTags[i]) > -1) {
            categories.push(tagCategories[tagCategory]);
            categories = categories.flat(Infinity);
          }
        }
      }
      inclusiveTags.push(categories);
      inclusiveTags = inclusiveTags.flat(Infinity);
      inclusiveTags = inclusiveTags.filter((el) => !newTags.includes(el));
      inclusiveTags = [...new Set(inclusiveTags)];
      setSuggestedTags(inclusiveTags);
    }
  }

  function removeTag(tag) {
    let newTags = searchTags;
    let tagToRemoveIndex = newTags.indexOf(tag);

    if (tagToRemoveIndex > -1) {
      newTags.splice(tagToRemoveIndex, 1);
    }
    setSearchTags(newTags);

    if (newTags.length) {
      props.dispatch(searchPostsByTag(newTags))
    } else {
      props.dispatch(getAllPostsAction());
      setSuggestedTags([]);
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

  function addToBlacklist(source) {
    let newBlacklist = [...blacklist];
    newBlacklist.push(source);
    setBlacklist(newBlacklist);
  }

  function removeFromBlacklist(source) {
    let newBlacklist = [...blacklist];
    var index = newBlacklist.indexOf(source);
    console.log(index);
    if (index > -1) {
      newBlacklist.splice(index, 1);
      setBlacklist(newBlacklist);
    }
  }

  useEffect(() => {
    setRenderSources(
      <div className="">
        {sources.map(
          function (source) {
            if (blacklist.indexOf(source) != -1) {
              return (
                <li className="tagBubble" key={source} onClick={() => { removeFromBlacklist(source) }}>
                  {source}
                  <i className="fas fa-times tagBubbleIcon"></i>
                </li>
              )
            } else {
              return (
                <li className="tagBubble" key={source} onClick={() => { addToBlacklist(source) }}>
                  {source}
                  <i className="fas fa-minus tagBubbleIcon"></i>
                </li>
              )
            }
          }
        )}
      </div>
    )
  }, [sources, blacklist])

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
  function _handleKeyDown(e) {
    if (e.key === 'Enter') {
      onSearchTag();
    }
  }
  return (
    <div>
      <div className="musicSearchContainer">
        <div className="musicSearchBarContainer">
          <i className="fas fa-search musicSearchBarIcon" onClick={() => { onSearchTag() }}></i>
          <input className="dashboardToolInput borderImage" placeholder="Search by tag" onKeyDown={_handleKeyDown} autoComplete="off" value={tagToAdd} onChange={e => setTagToAdd(e.target.value)} type="searchTag" name="searchTag" id="searchTag" />
          <ReactCSSTransitionGroup
            transitionName="icon"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {tagToAdd != "" &&
              <i className="fas fa-times musicSearchBarCancelIcon btn-vermillion" onClick={() => { setTagToAdd("") }}></i>
            }
          </ReactCSSTransitionGroup>
        </div>
        {autocompleteTagsLength > 0 && autocompleteTags}
      </div>
      <div>
        {searchTags.map(tag =>
          <li className="tagBubble" onClick={() => { removeTag(tag) }}>
            {tag}
            <i className="fas fa-minus tagBubbleIcon"></i>
          </li>
        )}
      </div>
      <ul>
        {suggestedTags.map(tag =>
          <li className="tagBubble" onClick={() => { onSearchTag(tag) }}>
            {tag}
            <i className="fas fa-plus tagBubbleIcon"></i>
          </li>
        )}
      </ul>
      {renderSources}
      <div>
        {postsContent}
      </div>
    </div >
  );
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(MusicPage);