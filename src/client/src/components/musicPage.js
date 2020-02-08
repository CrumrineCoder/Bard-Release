import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import {
  getAllPostsAction,
  getPostsByIDAction,
  getAllTagsAction
} from "../actions/linkActions";

import InfiniteScroll from "react-infinite-scroller";

import Post from "./Post";
import MusicSearchBar from "./musicSearchBar";
import LoginModal from "./loginModal";

import { checkCookie } from "../utils/cookies";
import { getCurrentUserAction } from "../actions/authenticationActions";
import useInfiniteScroll from "./useInfiniteScroll";
import { filter } from "minimatch";

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

  const [sourcesToFilterBy, setSourcesToFilterBy] = useState("");

  const [amountOfPosts, setAmountOfPosts] = useState(6);
  /*
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  */

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [finalizedLength, setFinalizedLength] = useState(0);
  const [sorting, setSorting] = useState("newest");

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  useEffect(() => {
    props.dispatch(getCurrentUserAction());
    setLoggedIn(checkCookie() != null);
    props.dispatch(getAllPostsAction());
    const data = {
      searchTag: ""
    };
    props.dispatch(getAllTagsAction(data));
  }, []);

  useEffect(() => {
    if (props.response.login) {
      if (props.response.login.user) {
        if (props.response.login.user.user) {
          setCurrentUser(props.response.login.user.user);
        }
      }
    }
  }, [props.response.login.user]);

  function redirect(location) {
    props.history.push(location);
  }

  useEffect(() => {
    if (filteredPosts && unfilteredPosts) {
      let postsToTransform = unfilteredPosts;

      //  let finalizedPosts = postsToTransform;
      let finalizedPosts;

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
      // console.log(props.response.dashboard.response);
      //  console.log(props.response.tags.response);
      if (props.response.tags.response) {
        if (
          props.response.tags.response.message == "Search by tag done." &&
          props.response.tags.response.tag.length == 0
        ) {
          //  console.log("true");
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
      //  console.log("bottom");
      //    console.log(allTags);
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
    console.log(sorting);
    if (props.response.dashboard.response != undefined) {
      console.log(sorting);
      setIsSuccess(props.response.dashboard.response.success);
      setMessage(props.response.dashboard.response.message);
      if (props.response.dashboard.response.post) {
        console.log(sorting);
        console.log(props.response.dashboard.response.post[0])
        //    console.log(props.response.dashboard.response)
        if (sorting) {
          if (sorting == "newest") {
            setUnfilteredPosts(props.response.dashboard.response.post);
            setFilteredPosts(
              props.response.dashboard.response.post.map(post =>
                post.link.replace(
                  "https://www.youtube.com/watch?v=",
                  "https://www.youtube.com/embed/"
                )
              )
            );
          } else if (sorting == "oldest") {
            let test = props.response.dashboard.response.post.reverse();
            console.log(test[0])
            setUnfilteredPosts(test);
            setFilteredPosts(
              test.map(post =>
                post.link.replace(
                  "https://www.youtube.com/watch?v=",
                  "https://www.youtube.com/embed/"
                )
              )
            );
          }
        }

        // console.log(props.response.dashboard.response.post);
    
        setAmountOfPosts(6);
      }
    }
  }, [props.response.dashboard.response, sorting]);

  useEffect(() => {
    //  console.log(props.response.tags.response)
    if (props.response.tags.response) {
      if (props.response.tags.response.message == "Search by tag done.") {
        // console.log("HEYA HERE'S THE TAGS", props.response.tags.response.tag);

        let postIDs = props.response.tags.response.tag.map(function(a) {
          return a.postID;
        });
        //    console.log(postIDs);
        if (postIDs.length > 0) {
          props.dispatch(getPostsByIDAction(postIDs));
        } // else do something
        // Now we have the post IDs, we have to find all posts by ID.
      }
    }
  }, [props.response.tags.response]);

  function fetchMoreListItems() {
    if (amountOfPosts < filteredPosts.length) {
      setTimeout(() => {
        //   console.log("more posts");
        setAmountOfPosts(amountOfPosts + 3);
        setIsFetching(false);
      }, 0);
    }
  }

  function handleChangeSorting(event) {
    console.log(event);
    console.log(event.target.value);
    setSorting(event.target.value);
  }

  function _handleKeyDown(e) {
    //  props.dispatch(turnoffOverlayAction());
    if (e.key === "Enter") {
      onSearchTag();
    }
  }

  useEffect(() => {}, [sourcesToFilterBy]);

  return (
    <div className="musicPageContainer">
      <LoginModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        redirect={redirect}
      ></LoginModal>
      <div className="musicSearchContainer">
        <input
          className="musicListingSourceSearchBar borderImage"
          placeholder="Search by sources [separated by commas]"
          onKeyDown={_handleKeyDown}
          autoComplete="off"
          value={sourcesToFilterBy}
          onChange={e => setSourcesToFilterBy(e.target.value)}
          type="searchSource"
          name="searchSource"
          id="searchSource"
        ></input>
      </div>
      <select value={sorting} onChange={handleChangeSorting}> 
        <option  value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
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
