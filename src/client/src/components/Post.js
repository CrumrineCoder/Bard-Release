import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllPostsAction, commentAction, getAllCommentsForOnePostAction, getAllTagsForOnePostAction, tagAction, removeUserFromTagAction, deleteCommentAction, editCommentAction, editPostAction } from '../actions/linkActions';
import tagCategories from "../utils/tagCategories";

function Post(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [commentChain, setCommentChain] = useState("");
  const [tagChain, setTagChain] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [tags, setTags] = useState("");
  const [comments, setComments] = useState("")
  const [tagToAdd, setTagToAdd] = useState("");
  const [existingTags, setExistingTags] = useState("");
  const [commentToAdd, setCommentToAdd] = useState("");
  const [tagLength, setTagLength] = useState(5);
  const [visualTags, setVisualTags] = useState("");
  const [commentUpdatedText, setCommentUpdatedText] = useState("");
  const [openCommentEdit, setOpenCommentEdit] = useState(false);

  const [postUpdatedLink, setPostUpdatedLink] = useState(props.post.link);
  const [postUpdatedSource, setPostUpdatedSource] = useState(props.post.source);
  const [postUpdatedName, setPostUpdatedName] = useState(props.post.name);
  const [openPostEdit, setOpenPostEdit] = useState(false);

  function getCommentsForOnePost(postId) {

    props.dispatch(getAllCommentsForOnePostAction(postId));
  }

  function getTagsForOnePost(postId) {
    props.dispatch(getAllTagsForOnePostAction(postId));
  }

  useEffect(() => {
    if (props.response.dashboard.response) {
      if (props.response.dashboard.response.message == "Tag added.") {
        getTagsForOnePost(props.post._id)
      } else if (props.response.dashboard.response.message == "Comment added.") {
        getCommentsForOnePost(props.post._id)
      }

      if (props.response.dashboard.response.comment) {
        if (props.response.dashboard.response.comment.length > 0) {
          if (props.response.dashboard.response.comment[0].postID == props.post._id) {
            setComments(props.response.dashboard.response.comment[0].comments);
            if (props.response.dashboard.response.comment[0].comments) {

            }
          }
        }
      }

      if (props.response.dashboard.response.tag) {
        if (props.response.dashboard.response.message == "Tags for post done.") {
          if (props.response.dashboard.response.tag.length > 0) {
            if (props.response.dashboard.response.tag[0].postID == props.post._id) {

              setTags(props.response.dashboard.response.tag[0].tags)
              setVisualTags(props.response.dashboard.response.tag[0].tags);
             
            }
          }
        }
      }
    }
  }, [props.response.dashboard.response])



  function removeUserFromTag(tag) {
    let category = tags.find(function (el) {
      return el.text === tag.category;
    })
    if (category) {
      props.dispatch(removeUserFromTagAction({ tag: category._id, user: props.currentUser, postID: props.post._id, text: category.text }));
    }
    props.dispatch(removeUserFromTagAction({ tag: tag._id, user: props.currentUser, postID: props.post._id, text: tag.text }))
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
          {visualTags.slice(0, tagLength).map(
            function (tag) {
              if (tag.emails.indexOf(props.currentUser) != -1) {
                return (
                  <li key={tag._id}>
                    {tag.text}
                    <i className="fas fa-times iconAction removeIcon" onClick={e => removeUserFromTag(tag)}></i>
                  </li>
                )
              } else {
                return (
                  <li key={tag._id}>
                    {tag.text}
                  </li>
                )
              }
            }
          )}
        </div>
      )
    }
    else {
      setTagChain(
        <p className="noContentDisclaimer">
          There are no tags yet.
        </p>
      )
    }
  }, [visualTags, tagLength])

  useEffect(() => {
    if (comments.length > 0) {
      setCommentChain(
        <div className="postsComments">
          {comments.map(
            function (comment, index) {
              if (comment.email == (props.currentUser)) {
                if (openCommentEdit) {
                  return (
                    <label htmlFor="commentToBeEdited">
                      <textarea autoFocus className="postCommentField borderImage" value={commentUpdatedText} rows="5" cols="25" autoComplete="off" onChange={e => setCommentUpdatedText(e.target.value)} type="commentToBeEdited" name="commentToBeEdited" id="commentToBeEdited" />
                      <div className="editCommentButtonContainer">
                        <button className="btn btn-post smallBtn borderImage" onClick={() => { editComment(comment) }}>Update</button>
                        <button className="btn btn-vermillion smallBtn borderImage" onClick={() => { setOpenCommentEdit(false) }} >Cancel</button>
                      </div>
                    </label>
                  )
                } else {
                  return (
                    <li key={comment._id + index}>
                      {comment.text}
                      <i className="fas fa-edit iconAction editIcon" onClick={() => { setOpenCommentEdit(true); setCommentUpdatedText(comment.text) }}></i>
                      <i className="fas fa-times iconAction removeIcon" onClick={() => deleteComment(comment)}></i>
                    </li>
                  )
                }
              } else {
                return (
                  <li key={comment._id + index}>
                    {comment.text}
                  </li>
                )
              }
            }
          )}
        </div>
      )
    } else {
      setCommentChain(
        <p className="noContentDisclaimer">
          There are no comments yet.
        </p>
      )
    }
  }, [comments, openCommentEdit, commentUpdatedText])

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
    setCommentToAdd("")
  }

  useEffect(() => {
    getTagsForOnePost(props.post._id);
    getCommentsForOnePost(props.post._id);
  }, [])

  function flatten(array, mutable) {
    var toString = Object.prototype.toString;
    var arrayTypeStr = '[object Array]';

    var result = [];
    var nodes = (mutable && array) || array.slice();
    var node;

    if (!array.length) {
      return result;
    }

    node = nodes.pop();

    do {
      if (toString.call(node) === arrayTypeStr) {
        nodes.push.apply(nodes, node);
      } else {
        result.push(node);
      }
    } while (nodes.length && (node = nodes.pop()) !== undefined);

    result.reverse(); // we reverse result to restore the original order
    return result;
  }

  useEffect(() => {
    if (tagToAdd.length > 0) {
      var re = new RegExp("^" + tagToAdd)

      let nestedTags = []
      for (var i = 0; i < Object.keys(tagCategories).length; i++) {
        nestedTags.push(Object.values(tagCategories)[i].filter(value => re.test(value)));
      }

      let flattenedTags = flatten(nestedTags, true)

      setExistingTags(
        <div>
          {flattenedTags.map(tag =>
            <li key={tag}>
              {tag}
            </li>
          )}
        </div>
      )
    } else {
      setExistingTags()
    }
  }, [tagToAdd])

  function getEmbed(link) {
    let embedLink = link.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
    embedLink += "?autoplay=1"
    return embedLink;
  }

  function showMoreTags() {
    setTagLength(tagLength + 3)
  }

  function onHandleTag(event) {
    event.preventDefault();
    let tag = event.target.tag.value;
    if (tag != undefined && tag != "") {
      tag = tag.toLowerCase();
      let _id = props.post._id;
      const data = {
        tag,
        _id
      };
      props.dispatch(tagAction(data));
    }
    setTagToAdd("")
  }
  return (
    <div className="borderImage postContainer">
      <div className="postTagContainer">
        <h3>Tags:</h3>
        {tagChain}
        {tagLength < visualTags.length && <button className="borderImage showMoreTags" onClick={e => showMoreTags()}>Show More</button>}
        {props.loggedIn ?
          <form onSubmit={onHandleTag}>
            <div className="dashboardToolLabel">
              <label htmlFor="tag"><input className="dashboardToolInput borderImage" value={tagToAdd} autoComplete="off" onChange={e => setTagToAdd(e.target.value)} type="tag" name="tag" id="tag" />
              </label>
            </div>
            <div>
              <button className="btn btn-post btn-centered borderImage" type="submit">Post Tag</button>
            </div>
          </form>
          : <button className="btn-post loginPromptButton borderImage" onClick={e => props.setModalOpen(true)}>Add a Tag</button>}
        {existingTags}
      </div>
      <div className="postVideoContainer">
        {openPostEdit ?
          <>
            <div className="updatePostForm">
              <div className="dashboardToolLabel">
                <label htmlFor="link">Link <input className="dashboardToolInput borderImage" value={postUpdatedLink} onChange={e => setPostUpdatedLink(e.target.value)} autoComplete="off" type="link" name="link" id="link" />
                </label>
              </div>
              <div className="dashboardToolLabel">
                <label htmlFor="source">Source <input className="dashboardToolInput borderImage" value={postUpdatedSource} onChange={e => setPostUpdatedSource(e.target.value)} autoComplete="off" type="source" name="source" id="source" />
                </label>
              </div>
              <div className="dashboardToolLabel">
                <label htmlFor="name">Name <input className="dashboardToolInput borderImage" value={postUpdatedName} onChange={e => setPostUpdatedName(e.target.value)} autoComplete="off" type="name" name="name" id="name" />
                </label>
              </div>
              <div>
                <button className="btn btn-post smallBtn borderImage" onClick={() => editPost()} type="submit">Update</button>
                <button className="btn btn-vermillion smallBtn borderImage" onClick={() => setOpenPostEdit(false)}>Cancel</button>
              </div>
            </div>
          </>
          :
          <>
            {props.post.email == props.currentUser && <i onClick={() => { setOpenPostEdit(true) }} className="fas fa-edit postEditButton iconAction editIcon"></i>}
            <div className="postVideoHeader">
              <h3>{props.post.source}</h3>
              <h4>{props.post.name}</h4>
            </div>

            <a className="postLink" href={props.post.link} target="_blank">{props.post.link}</a>

            <br />
            <i className={playVideo ? "fas fa-stop iconAction videoIcon" : "fas fa-play iconAction videoIcon"} onClick={() => setPlayVideo(!playVideo)}></i>
            {playVideo && <iframe className="videoIframe" width="350" height="150" src={getEmbed(props.post.link)} frameBorder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture">
            </iframe>}
          </>
        }

      </div>
      <div className="postCommentContainer">
        <h3>Comments:</h3>
        {commentChain}
        {props.loggedIn ?
          <form onSubmit={onHandleComment}>
            <div>
              <label htmlFor="comment"></label>
              <br />
              <textarea className="postCommentField borderImage" rows="5" cols="30" placeholder="Use in source, how it worked in a game or theorization, specifics of emotions" value={commentToAdd}
                onChange={e => setCommentToAdd(e.target.value)} type="comment" name="comment" id="comment" />
            </div>
            <div>
              <button className="btn btn-post btn-centered borderImage" type="submit">Post Comment</button>
            </div>
          </form>
          : <button className="btn-post loginPromptButton borderImage" onClick={e => props.setModalOpen(true)}>Add a Comment</button>}
      </div>
    </div>
  );
}
const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(Post);