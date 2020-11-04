import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import {
  getAllPostsAction,
  getPostsByIDAction,
  getAllTagsAction
} from "../actions/linkActions";

import Post from "../container/Post";
import LoginModal from "./loginModal";
import SourceSearchBlock from "./musicPageComponents/sourceSearchBlock";

import { checkCookie } from "../utils/cookies";
import { getCurrentUserAction } from "../actions/authenticationActions";
import useInfiniteScroll from "./useInfiniteScroll";

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
  const [alphabetAllTags, setAlphabetAllTags] = useState([]);

  const [sourcesToFilterBy, setSourcesToFilterBy] = useState("");

  const [amountOfPosts, setAmountOfPosts] = useState(6);
  const [showAllTags, setShowAllTags] = useState(false);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [finalizedLength, setFinalizedLength] = useState(0);

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function redirect(location) {
    props.history.push(location);
  }

  function fetchMoreListItems() {
    if (amountOfPosts < filteredPosts.length) {
      setTimeout(() => {
        //   console.log("more posts");
        setAmountOfPosts(amountOfPosts + 3);
        setIsFetching(false);
      }, 0);
    }
  }

  function reverseSorting() {
    console.log("test");
    let temp = unfilteredPosts.reverse();
    setFilteredPosts(
      temp
        .reverse()
        .map(post =>
          post.link.replace(
            "https://www.youtube.com/watch?v=",
            "https://www.youtube.com/embed/"
          )
        )
    );
    setUnfilteredPosts(temp.reverse());
  }

  function _handleKeyDown(e) {
    if (e.key === "Enter") {
    }
  }

  // On initial load, get the current user, check if we're logged in, get all posts, and get all tags.
  useEffect(() => {
    props.dispatch(getCurrentUserAction());
    setLoggedIn(checkCookie() != null);
    props.dispatch(getAllPostsAction());
    const data = {
      searchTag: ""
    };
    props.dispatch(getAllTagsAction(data));
  }, []);

  // Whenever the global user changes, change the current user.
  useEffect(() => {
    if (props.response.login) {
      if (props.response.login.user) {
        if (props.response.login.user.user) {
          setCurrentUser(props.response.login.user.user);
        }
      }
    }
  }, [props.response.login.user]);

  useEffect(() => {
    if (filteredPosts && unfilteredPosts) {
      let postsToTransform = unfilteredPosts;
      let finalizedPosts;

      if (props.response.tags.response) {
        if (props.response.tags.response.message == "Get all tags done.") {
          if (props.response.tags.response.tag) {
            if (props.response.tags.response.tag.length > 0) {
              let sorted = props.response.tags.response.tag.sort(function(
                a,
                b
              ) {
                if (a._id < b._id) {
                  return -1;
                }
                if (a._id > b._id) {
                  return 1;
                }
                return 0;
              });
              setAlphabetAllTags(sorted.slice());
              let returnedArray = shuffle(props.response.tags.response.tag);
              setAllTags(returnedArray);
            }
          }
        }
      }

      if (props.response.tags.response) {
        if (
          props.response.tags.response.message == "Search by tag done." &&
          props.response.tags.response.tag.length == 0
        ) {
          setPostsContent(
            <h1 className="noPostsDisclaimer">
              There are no posts to display for this search.
            </h1>
          );
          return;
        } else if (
          props.response.tags.response.message != "Check sources done." &&
          props.response.tags.response.message != "Check tags done."
        ) {
          if (postsToTransform.length == 0) {
            setPostsContent(
              <h1 className="noPostsDisclaimer">
                There are no posts to display for this search and filter.
              </h1>
            );
            return;
          } else {
            //     console.log("Redisplay")
            //   console.log(allTags);
          }
        }
      }
      let sources = sourcesToFilterBy.split(",");

      sources = sources.map(function(value) {
        return value.toLowerCase().replace(/\s+/g, "");
      });
      if (postsToTransform) {
        let postsWithSourceInThem = postsToTransform.filter(function(post) {
          return (
            sources.indexOf(post.source.toLowerCase().replace(/\s+/g, "")) != -1
          );
        });
        if (postsWithSourceInThem.length) {
          finalizedPosts = postsWithSourceInThem;
        } else if (sources[0].replace('""', '').length != 0) {
          setPostsContent(
            <h1 className="noPostsDisclaimer">
              There are no posts to display for this source.
            </h1>
          );
          return;
        } else {
          finalizedPosts = postsToTransform;
        }
      }
      setFinalizedLength(finalizedPosts.length);

      let cut = finalizedPosts.slice(0, amountOfPosts);
      setPostsContent(
        <div className="posts">
          {cut.map(post => (
            <Post
              currentUser={currentUser}
              allTags={allTags}
              setModalOpen={setModalOpen}
              post={post}
              key={post._id}
              loggedIn={loggedIn}
            ></Post>
          ))}
        </div>
      );
    }
  }, [
    filteredPosts,
    props.response.dashboard.response,
    props.response.tags.response,
    amountOfPosts,
    sourcesToFilterBy
  ]);

  useEffect(() => {
    if (props.response.dashboard.response != undefined) {
      setIsSuccess(props.response.dashboard.response.success);
      setMessage(props.response.dashboard.response.message);
      if (props.response.dashboard.response.post) {
        setUnfilteredPosts(props.response.dashboard.response.post);
        setFilteredPosts(
          props.response.dashboard.response.post.map(post =>
            post.link.replace(
              "https://www.youtube.com/watch?v=",
              "https://www.youtube.com/embed/"
            )
          )
        );
        setAmountOfPosts(6);
      }
    }
  }, [props.response.dashboard.response]);

  useEffect(() => {
    if (props.response.tags.response) {
      if (props.response.tags.response.message == "Search by tag done.") {
        let postIDs = props.response.tags.response.tag.map(function(a) {
          return a.postID;
        });
        if (postIDs.length > 0) {
          console.log("tag");
          props.dispatch(getPostsByIDAction(postIDs));
        } // else do something
        // Now we have the post IDs, we have to find all posts by ID.
      }
    }
  }, [props.response.tags.response]);

  useEffect(() => {}, [sourcesToFilterBy]);

  return (
    <div className="musicPageContainer">
      <LoginModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        redirect={redirect}
      ></LoginModal>

      <SourceSearchBlock
        setSourcesToFilterBy={setSourcesToFilterBy}
        _handleKeyDown={_handleKeyDown}
        sourcesToFilterBy={sourcesToFilterBy}
        setShowAllTags={setShowAllTags}
        showAllTags={showAllTags}
        alphabetAllTags={alphabetAllTags}
        reverseSorting={reverseSorting}
      ></SourceSearchBlock>

      {postsContent}
      {isFetching && amountOfPosts < finalizedLength && (
        <Fragment>
          <div className="cs-loader">
            <div className="cs-loader-inner">
              <label> ●</label>
              <label> ●</label>
              <label> ●</label>
              <label> ●</label>
              <label> ●</label>
              <label> ●</label>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
const mapStateToProps = response => ({ response });
export default connect(mapStateToProps)(MusicPage);
