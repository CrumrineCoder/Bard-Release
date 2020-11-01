import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import {
  getAllPostsAction,
  commentAction,
  getAllCommentsForOnePostAction,
  getAllTagsForOnePostAction,
  tagAction,
  removeUserFromTagAction,
  deleteCommentAction,
  editCommentAction,
  editPostAction,
  updateLinkAction
} from "../actions/linkActions";

import  VideoPost  from "../components/postComponents/videoPost"
import EditPost from "../components/postComponents/editPost"

import tagCategories from "../utils/tagCategories";
import { getCurrentUserAction } from "../actions/authenticationActions";
import { checkCookie } from "../utils/cookies";


function Post(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [commentChain, setCommentChain] = useState("");
  const [tagChain, setTagChain] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [tags, setTags] = useState("");
  const [comments, setComments] = useState("");
  const [tagToAdd, setTagToAdd] = useState("");
  const [existingTags, setExistingTags] = useState("");
  const [commentToAdd, setCommentToAdd] = useState("");
  const [tagLength, setTagLength] = useState(10);
  const [visualTags, setVisualTags] = useState("");
  const [commentUpdatedText, setCommentUpdatedText] = useState("");
  const [openCommentEdit, setOpenCommentEdit] = useState(false);
  const [loggedIn, setLoggedIn] = useState();

  const [postUpdatedLink, setPostUpdatedLink] = useState(props.post.link);
  const [postUpdatedSource, setPostUpdatedSource] = useState(props.post.source);
  const [postUpdatedName, setPostUpdatedName] = useState(props.post.name);
  const [openPostEdit, setOpenPostEdit] = useState(false);

  const [allTags, setAllTags] = useState([]);

  const [section, setSection] = useState("tags");

  const [copied, setCopied] = useState(false);

  function getCommentsForOnePost(postId) {
    props.dispatch(getAllCommentsForOnePostAction(postId));
  }

  function getTagsForOnePost(postId) {
    props.dispatch(getAllTagsForOnePostAction(postId));
  }

  useEffect(() => {
    if (props.response.comments.response) {
      if (props.response.comments.response.message == "Comment added.") {
        getCommentsForOnePost(props.post._id);
      }

      if (props.response.comments.response.comment) {
        if (props.response.comments.response.comment.length > 0) {
          if (
            props.response.comments.response.comment[0].postID == props.post._id
          ) {
            setComments(props.response.comments.response.comment[0].comments);
            if (props.response.comments.response.comment[0].comments) {
            }
          }
        }
      }
    }
  }, [props.response.comments.response]);

  useEffect(() => {
    props.dispatch(getCurrentUserAction());
    setLoggedIn(checkCookie() != null);
  }, []);

  useEffect(() => {
    if (props.response.login.user) {
      //    console.log(props.backendData.login.user)
      if (props.response.login.user.token != undefined) {
        setIsSuccess(props.response.login.user.success);
      } else {
        setIsSuccess(checkCookie() != null);
      }
    }
  }, [props.response.login.user]);

  useEffect(() => {
    if (props.response.tags.response) {
      // console.log(props.response.tags.response.tag);
      if (props.response.tags.response.tag) {
        if (props.response.tags.response.message == "Tags for post done.") {
          if (props.response.tags.response.tag.length > 0) {
            if (props.response.tags.response.tag[0].postID == props.post._id) {
              setTags(props.response.tags.response.tag[0].tags);
              setVisualTags(props.response.tags.response.tag[0].tags);
            }
          }
        }
      } else if (
        props.response.tags.response.message == "Tag added." &&
        props.response.tags.response.id == props.post._id
      ) {
        getTagsForOnePost(props.post._id);
      } else if (
        props.response.tags.response.message == "Tag removed." &&
        props.response.tags.response.id == props.post._id
      ) {
        getTagsForOnePost(props.post._id);
      }
    }
  }, [props.response.tags.response]);
  function removeUserFromTag(tag) {
    /*
    let category = tags.find(function (el) {
      return el.text === tag.category;
    })
    if (category) {
      props.dispatch(removeUserFromTagAction({ tag: category._id, user: props.currentUser, postID: props.post._id, text: category.text }));
    }
    */
    props.dispatch(
      removeUserFromTagAction({
        tag: tag._id,
        user: props.currentUser,
        postID: props.post._id,
        text: tag.text
      })
    );
  }

  function deleteComment(comment) {
    props.dispatch(deleteCommentAction(comment));
  }

  function editComment(comment) {
    comment["text"] = commentUpdatedText;
    props.dispatch(editCommentAction(comment));
    setOpenCommentEdit(false);
  }

  function editPost() {
    let updatedPost = props.post;
    updatedPost["link"] = postUpdatedLink;
    updatedPost["source"] = postUpdatedSource;
    updatedPost["name"] = postUpdatedName;
    props.dispatch(editPostAction(updatedPost));
    setOpenPostEdit(false);
  }

  useEffect(() => {
    if (visualTags.length > 0) {
      setTagChain(
        <div className="postsTags">
          {visualTags.slice(0, tagLength).map(function(tag) {
            if (tag.emails.indexOf(props.currentUser) != -1) {
              return (
                <li
                  className="tagBubble borderImage removeBubble smallTagBubble editableTagBubble"
                  onClick={e => removeUserFromTag(tag)}
                  key={tag._id}
                >
                  {tag.text}
                  <i className="fas fa-times marginLeftIcon iconAction removeIcon"></i>
                </li>
              );
            } else {
              return (
                <li
                  className="tagBubble borderImage smallTagBubble"
                  key={tag._id}
                >
                  {tag.text}
                </li>
              );
            }
          })}
          {tagLength < visualTags.length && (
            <i
              className="fas fa-arrow-circle-right showMoreTags"
              onClick={e => showMoreTags()}
            ></i>
          )}
        </div>
      );
    } else {
      setTagChain(
        <p className="noContentDisclaimer">There are no tags yet.</p>
      );
    }
  }, [visualTags, tagLength]);

  useEffect(() => {
    if (comments.length > 0) {
      setCommentChain(
        <div className="postsComments">
          {comments.map(function(comment, index) {
            if (comment.email == props.currentUser) {
              if (openCommentEdit == comment._id) {
                return (
                  <label htmlFor="commentToBeEdited">
                    <textarea
                      autoFocus
                      className="postCommentField borderImage"
                      value={commentUpdatedText}
                      rows="5"
                      cols="25"
                      autoComplete="off"
                      onChange={e => setCommentUpdatedText(e.target.value)}
                      type="commentToBeEdited"
                      name="commentToBeEdited"
                      id="commentToBeEdited"
                    />
                    <div className="editCommentButtonContainer">
                      <button
                        className="btn btn-post smallBtn borderImage"
                        onClick={() => {
                          editComment(comment);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-vermillion smallBtn borderImage"
                        onClick={() => {
                          setOpenCommentEdit(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </label>
                );
              } else {
                return (
                  <li
                    className="commentArea commentEditArea"
                    key={comment._id + index}
                  >
                    {comment.text}
                    <span className="commentIcons">
                      <i
                        className="fas fa-edit marginLeftIcon iconAction editIcon"
                        onClick={() => {
                          setOpenCommentEdit(comment._id);
                          setCommentUpdatedText(comment.text);
                        }}
                      ></i>
                      <i
                        className="fas fa-times marginLeftIcon iconAction removeIcon"
                        onClick={() => deleteComment(comment)}
                      ></i>
                    </span>
                  </li>
                );
              }
            } else {
              return (
                <li className="commentArea" key={comment._id + index}>
                  {comment.text}
                </li>
              );
            }
          })}
        </div>
      );
    } else {
      setCommentChain(
        <p className="noContentDisclaimer">There are no notes yet.</p>
      );
    }
  }, [comments, openCommentEdit, commentUpdatedText]);

  function onHandleComment(event) {
    event.preventDefault();
    let comment = event.target.comment.value;
    let _id = props.post._id;
    const data = {
      comment,
      _id
    };
    props.dispatch(commentAction(data));
    props.dispatch(getAllPostsAction());
    setCommentToAdd("");
  }

  useEffect(() => {
    getTagsForOnePost(props.post._id);
    getCommentsForOnePost(props.post._id);
  }, []);

  function _handleKeyDown(e) {
    if (e.key === "Enter") {
      onHandleTag();
    }
  }

  useEffect(() => {
    let newArr = allTags.concat(props.allTags);
    //   console.log(props.allTags);
    newArr = props.allTags.map(function(i) {
      return i._id;
    });
    // console.log(newArr);
    setAllTags(newArr);
  }, [props.allTags]);

  useEffect(() => {
    if (tagToAdd.length > 0) {
      var re = new RegExp("^" + tagToAdd);

      let nestedTags = [];
      for (var i = 0; i < Object.keys(tagCategories).length; i++) {
        nestedTags.push(
          Object.values(tagCategories)[i].filter(value => re.test(value))
        );
      }
      nestedTags.push(allTags);
      let flattenedTags = nestedTags.flat(Infinity);
      flattenedTags = flattenedTags.filter(tag => tag.startsWith(tagToAdd));
      flattenedTags = [...new Set(flattenedTags)];
      setExistingTags(
        <div className="tagBubbleSuggestionContainer">
          {flattenedTags.map(tag => (
            <li
              onClick={() => onHandleTag(tag)}
              className="tagBubbleSuggestion addBubble tagBubble smallTagBubble borderImage editableTagBubble"
              key={tag}
            >
              {tag}
              <i className="fas fa-plus marginLeftIcon tagBubbleIcon"></i>
            </li>
          ))}
        </div>
      );
    } else {
      setExistingTags();
    }
  }, [tagToAdd, allTags]);

  function updateLinkAutomatically(){
    //console.log("TestupdateLinkAutomatically")
    let updatedPost = props.post;
    console.log(updatedPost)
    // postUpdatedSource + " " + postUpdatedName, 
    props.dispatch(updateLinkAction(updatedPost))
    //props.dispatch(getAllPostsAction());
    
  }



  function showMoreTags() {
    setTagLength(tagLength + 10);
  }

  function onHandleTag(tag) {
    let localTagToAdd;
    tag != undefined ? (localTagToAdd = tag) : (localTagToAdd = tagToAdd);
    if (localTagToAdd != undefined && localTagToAdd != "") {
      localTagToAdd = localTagToAdd.toLowerCase();
      let _id = props.post._id;
      const data = {
        tag: localTagToAdd,
        _id
      };
      props.dispatch(tagAction(data));
    }
    setTagToAdd("");
  }
  /*
  <i className={playVideo ? "fas fa-stop iconAction videoIcon" : "fas fa-play iconAction videoIcon"} onClick={() => setPlayVideo(!playVideo)}></i>
  {playVideo &&
          <iframe className="videoIframe" width="350" height="150" src={getEmbed(props.post.link)} frameBorder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture">
          </iframe>}
      
            {tagLength < visualTags.length && <button className="borderImage showMoreTags" onClick={e => showMoreTags()}>Show More</button>}
      
      <    button onClick={() => onHandleTag()} className="btn btn-post btn-centered borderImage" type="submit">Post Tag</button>
          */

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="borderImage postContainer">
      {copied && <p className="postContainerOverlayPasteMessage">copied!</p>}

      <VideoPost playVideo={playVideo} link={props.post.link} setPlayVideo={setPlayVideo}/>
      <div className="postVideoContainer">
        {openPostEdit ? (
          <>
            <EditPost setPostUpdatedName={setPostUpdatedName} setPostUpdatedLink={setPostUpdatedLink} setOpenPostEdit={setOpenPostEdit} setPostUpdatedSource={setPostUpdatedSource}
            editPost={editPost} 
            postUpdatedName={postUpdatedName} link={postUpdatedLink} postUpdatedSource={postUpdatedSource}
            ></EditPost>
          </>
        ) : (
          <>
            <div className="postVideoIcons">
              {props.post.email == props.currentUser && (
                <>
                  <i
                    onClick={() => {
                      updateLinkAutomatically();
                    }}
                    className="fas fa-sync marginIcon postEditButton iconAction editIcon"
                  ></i>
                  <i
                    onClick={() => {
                      setOpenPostEdit(true);
                    }}
                    className="fas fa-edit marginIcon postEditButton iconAction editIcon"
                  ></i>
                </>
              )}

              <i
                onClick={() => {
                  navigator.clipboard.writeText(props.post.link);
                  setCopied(true);
                }}
                className="fas fa-link editIcon iconAction"
              ></i>
            </div>
            <div className="postVideoHeader">
              <h3>{props.post.source}</h3>
              <h4>{props.post.name}</h4>
            </div>
          </>
        )}
      </div>

      <div className="postChooseSectionContainer">
        <span
          className={
            section == "tags"
              ? "postChooseSectionLink active"
              : "postChooseSectionLink"
          }
          onClick={() => setSection("tags")}
        >
          Tags
        </span>

        <span
          className={
            section == "notes"
              ? "postChooseSectionLink active"
              : "postChooseSectionLink"
          }
          onClick={() => setSection("notes")}
        >
          {comments.length > 0 && (
            <p className="postChooseSectionNoteNumber">
              {comments.length > 9 ? "9+" : comments.length}
            </p>
          )}
          Notes
        </span>
      </div>

      {section == "tags" ? (
        <div className="postTagContainer">
          {tagChain}

          {loggedIn ? (
            <div className="postDashboardContainer">
              <div className="dashboardToolLabel">
                <input
                  className="dashboardToolInput borderImage"
                  placeholder={allTags[3]}
                  onKeyDown={_handleKeyDown}
                  value={tagToAdd}
                  autoComplete="off"
                  onChange={e => setTagToAdd(e.target.value)}
                  type="tag"
                  name="tag"
                  id="tag"
                />{" "}
                <i className="addTagIcon marginLeftIcon fas fa-plus-square"></i>
              </div>
              {existingTags}
            </div>
          ) : (
            <button
              className="btn-post loginPromptButton borderImage"
              onClick={e => props.setModalOpen(true)}
            >
              Add a Tag
            </button>
          )}
        </div>
      ) : (
        <div className="postCommentContainer">
          {commentChain}
          {loggedIn ? (
            <form className="postDashboardContainer" onSubmit={onHandleComment}>
              <div>
                <label htmlFor="comment"></label>
                <textarea
                  className="postCommentField borderImage"
                  rows="5"
                  cols="30"
                  placeholder="Use in source, how it worked in a game or theorization, specifics of emotions"
                  value={commentToAdd}
                  onChange={e => setCommentToAdd(e.target.value)}
                  type="comment"
                  name="comment"
                  id="comment"
                />
              </div>
              <div>
                <button
                  className="btn btn-post btn-centered borderImage"
                  type="submit"
                >
                  Post Note
                </button>
              </div>
            </form>
          ) : (
            <button
              className="btn-post loginPromptButton borderImage"
              onClick={e => props.setModalOpen(true)}
            >
              Add a Note
            </button>
          )}
        </div>
      )}
    </div>
  );
}
const mapStateToProps = response => ({ response });
export default connect(mapStateToProps)(Post);