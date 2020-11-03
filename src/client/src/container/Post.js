import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getAllCommentsForOnePostAction,
  getAllTagsForOnePostAction,
  tagAction,
  editPostAction,
  updateLinkAction
} from "../actions/linkActions";

import VideoPost from "../components/postComponents/videoPost";
import EditPost from "../components/postComponents/editPost";
import VideoIcons from "../components/postComponents/videoIcons";
import SectionHeaders from "../components/postComponents/sectionHeaders";
import VideoTags from "../components/postComponents/videoTags";
import VideoComments from "../components/postComponents/videoComments";
import VideoCommentBlock from "../components/postComponents/videoCommentBlock";
import VideoTagBlock from "../components/postComponents/videoTagBlock";

import tagCategories from "../utils/tagCategories";
import { getCurrentUserAction } from "../actions/authenticationActions";
import { checkCookie } from "../utils/cookies";

function Post(props) {
  const [commentUpdatedText, setCommentUpdatedText] = useState("");
  const [commentChain, setCommentChain] = useState("");

  const [openCommentEdit, setOpenCommentEdit] = useState(false);
  const [comments, setComments] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [tagChain, setTagChain] = useState("");
  const [playVideo, setPlayVideo] = useState(false);
  const [tags, setTags] = useState("");
  const [tagToAdd, setTagToAdd] = useState("");
  const [existingTags, setExistingTags] = useState("");
  const [tagLength, setTagLength] = useState(10);
  const [visualTags, setVisualTags] = useState("");

  const [loggedIn, setLoggedIn] = useState();

  const [postUpdatedLink, setPostUpdatedLink] = useState(props.post.link);
  const [postUpdatedSource, setPostUpdatedSource] = useState(props.post.source);
  const [postUpdatedName, setPostUpdatedName] = useState(props.post.name);
  const [openPostEdit, setOpenPostEdit] = useState(false);

  const [allTags, setAllTags] = useState([]);

  const [section, setSection] = useState("tags");

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    props.dispatch(getCurrentUserAction());
    setLoggedIn(checkCookie() != null);
  }, []);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

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

  function editPost() {
    let updatedPost = props.post;
    updatedPost["link"] = postUpdatedLink;
    updatedPost["source"] = postUpdatedSource;
    updatedPost["name"] = postUpdatedName;
    props.dispatch(editPostAction(updatedPost));
    setOpenPostEdit(false);
  }

  useEffect(() => {
    getTagsForOnePost(props.post._id);
    getCommentsForOnePost(props.post._id);
  }, []);

  function updateLinkAutomatically() {
    let updatedPost = props.post;
    // postUpdatedSource + " " + postUpdatedName,
    props.dispatch(updateLinkAction(updatedPost));
    //props.dispatch(getAllPostsAction());
  }

  function getCommentsForOnePost(postId) {
    props.dispatch(getAllCommentsForOnePostAction(postId));
  }

  useEffect(() => {
    if (comments.length > 0) {
      setCommentChain(
        <VideoCommentBlock
          comments={comments}
          currentUser={props.currentUser}
          openCommentEdit={openCommentEdit}
          commentUpdatedText={commentUpdatedText}
          setCommentUpdatedText={setCommentUpdatedText}
          setOpenCommentEdit={setOpenCommentEdit}
        ></VideoCommentBlock>
      );
    } else {
      setCommentChain(
        <p className="noContentDisclaimer">There are no notes yet.</p>
      );
    }
  }, [comments, openCommentEdit, commentUpdatedText]);

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

  function getTagsForOnePost(postId) {
    props.dispatch(getAllTagsForOnePostAction(postId));
  }

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

  useEffect(() => {
    if (visualTags.length > 0) {
      setTagChain(
        <VideoTagBlock
          visualTags={visualTags}
          tagLength={tagLength}
          currentUser={props.currentUser}
          postID={props.post._id}
          showMoreTags={showMoreTags}
        ></VideoTagBlock>
      );
    } else {
      setTagChain(
        <p className="noContentDisclaimer">There are no tags yet.</p>
      );
    }
  }, [visualTags, tagLength]);

  useEffect(() => {
    let newArr = allTags.concat(props.allTags);
    newArr = props.allTags.map(function(i) {
      return i._id;
    });
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

  function showMoreTags() {
    setTagLength(tagLength + 10);
  }

  function onHandleTag(tag) {
    let localTagToAdd;
    tag != undefined && typeof tag != "object"
      ? (localTagToAdd = tag)
      : (localTagToAdd = tagToAdd);
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

  return (
    <div className="borderImage postContainer">
      {copied && <p className="postContainerOverlayPasteMessage">copied!</p>}

      <VideoPost
        playVideo={playVideo}
        link={props.post.link}
        setPlayVideo={setPlayVideo}
      />
      <div className="postVideoContainer">
        {openPostEdit ? (
          <>
            <EditPost
              setPostUpdatedName={setPostUpdatedName}
              setPostUpdatedLink={setPostUpdatedLink}
              setOpenPostEdit={setOpenPostEdit}
              setPostUpdatedSource={setPostUpdatedSource}
              editPost={editPost}
              postUpdatedName={postUpdatedName}
              link={postUpdatedLink}
              postUpdatedSource={postUpdatedSource}
            ></EditPost>
          </>
        ) : (
          <VideoIcons
            currentUser={props.currentUser}
            email={props.post.email}
            updateLinkAutomatically={updateLinkAutomatically}
            setOpenPostEdit={setOpenPostEdit}
            source={props.post.source}
            name={props.post.name}
            link={props.post.link}
          ></VideoIcons>
        )}
      </div>
      <SectionHeaders
        setSection={setSection}
        section={section}
        comments={comments}
      ></SectionHeaders>
      {loggedIn}
      {section == "tags" ? (
        <VideoTags
          tagChain={tagChain}
          loggedIn={loggedIn}
          placeholderTag={allTags[3]}
          onHandleTag={onHandleTag}
          tagToAdd={tagToAdd}
          setTagToAdd={setTagToAdd}
          existingTag={existingTags}
          setModalOpen={props.setModalOpen}
        ></VideoTags>
      ) : (
        <VideoComments
          comments={comments}
          currentUser={props.currentUser}
          loggedIn={loggedIn}
          setModalOpen={props.setModalOpen}
          commentChain={commentChain}
          postID={props.post._id}
        ></VideoComments>
      )}
    </div>
  );
}
const mapStateToProps = response => ({ response });
export default connect(mapStateToProps)(Post);