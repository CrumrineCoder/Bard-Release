import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllPostsAction, getPostsByIDAction, getAllTagsAction } from '../actions/linkActions';

import Post from "./Post";
import MusicSearchBar from "./musicSearchBar";
import LoginModal from "./loginModal";

import { checkCookie } from '../utils/cookies';
import { getCurrentUserAction } from '../actions/authenticationActions';

function MusicPage(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [postsContent, setPostsContent] = useState("");
  const [filteredPosts, setFilteredPosts] = useState("");
  const [unfilteredPosts, setUnfilteredPosts] = useState("");
  const [loggedIn, setLoggedIn] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [allTags, setAllTags] = useState([]);

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  useEffect(() => {
    props.dispatch(getCurrentUserAction())
    setLoggedIn(checkCookie() != null)
    props.dispatch(getAllPostsAction())
    const data = {
      searchTag: ""
    };
    props.dispatch(getAllTagsAction(data));
  }, [])

  useEffect(() => {
    if (props.response.login) {
      if (props.response.login.user) {
        if (props.response.login.user.user) {
          setCurrentUser(props.response.login.user.user);
        }
      }

    }
  }, [props.response.login.user])

  function redirect(location) {
    props.history.push(location);
  }


  useEffect(() => {
    if (filteredPosts && unfilteredPosts) {
      let postsToTransform = unfilteredPosts;
      let finalizedPosts = postsToTransform;
      if (props.response.tags.response) {
        if (props.response.tags.response.message == "Get all tags done.") {
          if (props.response.tags.response.tag) {
            if (props.response.tags.response.tag.length > 0) {
              let returnedArray = shuffle(props.response.tags.response.tag);
              //   console.log(returnedArray);
              setAllTags(returnedArray);
            }
          }
        }
      }

      if (props.response.dashboard.response) {
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
            console.log("Redisplay")
            //   console.log(allTags);

          }
        }
      }
      console.log("bottom");
      console.log(allTags);
      let cut = finalizedPosts.slice(0, 1);
      setPostsContent(
        <div className="posts">
          {cut.map(post =>
            <Post currentUser={currentUser} allTags={allTags} setModalOpen={setModalOpen} post={post} key={post._id} loggedIn={loggedIn}></Post>
          )}
        </div>
      )
    }
  }, [filteredPosts, props.response.dashboard.response, props.response.tags.response])

  useEffect(() => {
    if (props.response.dashboard.response != undefined) {
      setIsSuccess(props.response.dashboard.response.success);
      setMessage(props.response.dashboard.response.message);
      if (props.response.dashboard.response.post) {
        setUnfilteredPosts(props.response.dashboard.response.post)
        //  console.log(props.response.dashboard.response.post);
        setFilteredPosts(props.response.dashboard.response.post.map(post => post.link.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")))
      }
    }
  }, [props.response.dashboard.response])

  useEffect(() => {
    //  console.log(props.response.tags.response)
    if (props.response.tags.response) {
      if (props.response.tags.response.message == "Search by tag done.") {
        console.log("HEYA HERE'S THE TAGS", props.response.tags.response.tag);

        let postIDs = props.response.tags.response.tag.map(function (a) {
          return a.postID
        });
        //    console.log(postIDs);
        if (postIDs.length > 0) {
          props.dispatch(getPostsByIDAction(postIDs));
        } // else do something
        // Now we have the post IDs, we have to find all posts by ID. 
      }
    }
  }, [props.response.tags.response])

  return (
    <div>
      <MusicSearchBar></MusicSearchBar>
      <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} redirect={redirect}></LoginModal>
      {postsContent}
    </div >
  );
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(MusicPage);