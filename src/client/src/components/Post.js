import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { postAction, getAllPostsAction, commentAction, getAllCommentsForOnePostAction, getAllTagsForOnePostAction, tagAction, removeUserFromTagAction, deleteCommentAction, editCommentAction } from '../actions/linkActions';
import tagCategories from "../utils/tagCategories";

//,{post, postID, index, comment, response }
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
  const [tagLength, setTagLength] = useState(3);
  const [visualTags, setVisualTags] = useState("");
  const [commentUpdatedText, setCommentUpdatedText] = useState("");
  const [openCommentEdit, setOpenCommentEdit] = useState(false);

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
        //   console.log(props.response.dashboard.response.comment[0])
        if (props.response.dashboard.response.comment.length > 0) {
          if (props.response.dashboard.response.comment[0].postID == props.post._id) {
            //    console.log(props.response.dashboard.response.comment[0]);
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
              /*
              setTags(props.response.dashboard.response.tag[0].tags)
              let parents = [];
              let tagsToShow = props.response.dashboard.response.tag[0].tags;

              Object.keys(tagCategories).forEach((tagCategory, index, arr) => {
                parents.push(tagCategory)
              })

              tagsToShow = tagsToShow.filter(function (el) {
                return parents.indexOf(el.text) < 0;
              });

              tagsToShow = tagsToShow.map(function (el) {
                var o = Object.assign({}, el);
                let i = 0;
                for (var tagCategory in tagCategories) {
                  i++;
                  let tagValues = tagCategories[tagCategory];
                  if (tagValues.indexOf(el.text) > -1 || el.text == tagCategory) {
                    o["category"] = tagCategory;
                    return o;
                  } else if (i == 13) {
                    return o
                  }
                }
              })
              setVisualTags(tagsToShow);
              */
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
    /*  console.log(category);
      if (tags.some(e => e.text === tag.category)) {
        console.log("yES!!");
        console.log(tag.category);
        category = tag.catgory;
        
        /* vendors contains the element we're looking for */
    /*  } else {
        console.log("bad!");
  
      }
      props.dispatch(removeUserFromTagAction({ tag: tag._id, user: props.currentUser, postID: props.post._id, text: tag.text }))*/
    // let category = tags.find(obj=>{
    // return obj.text = tag.category; 
    //})
    //   console.log(category);

  }

  function deleteComment(comment) {
    console.log(comment);
    props.dispatch(deleteCommentAction(comment));
  }

  function editComment(comment) {
    console.log(comment);
    comment["text"] = commentUpdatedText;
    props.dispatch(editCommentAction(comment));
    setOpenCommentEdit(false);
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
                    <i className="fas fa-times removeTag" onClick={e => removeUserFromTag(tag)}></i>
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
    // console.log(comments);
    if (comments.length > 0) {
      setCommentChain(
        <div className="postsComments">
          {comments.map(
            function (comment, index) {
              if (comment.email == (props.currentUser)) {
                if (openCommentEdit) {
                  return (
                    <label htmlFor="commentToBeEdited">Update comment text:
                        <input autoFocus className="dashboardToolInput borderImage" value={commentUpdatedText} autoComplete="off" onChange={e => setCommentUpdatedText(e.target.value)} type="commentToBeEdited" name="commentToBeEdited" id="commentToBeEdited" />
                      <div className="editCommentButtonContainer">
                        <button className="btn btn-post smallBtn borderImage" onClick={() => { editComment(comment) }}>Submit</button>
                        <button className="btn btn-vermillion smallBtn borderImage" onClick={() => { setOpenCommentEdit(false) }} >Cancel</button>
                      </div>
                    </label>
                  )
                } else {
                  return (
                    <li key={comment._id + index}>
                      {comment.text}
                      <i className="fas fa-times removeTag" onClick={() => deleteComment(comment)}></i>
                      <i className="fas fa-edit removeTag" onClick={() => { setOpenCommentEdit(true); setCommentUpdatedText(comment.text) }}></i>
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
    // let _id = props.response.dashboard.response.post[0]._id;
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

  useEffect(() => {
    // console.log(props);
  })

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
    // console.log(embedLink);
    embedLink += "?autoplay=1"
    return embedLink;
  }

  function getPopOut(link) {
    return link.replace("https://www.youtube.com/watch?v=", "http://youtu.be/");
  }

  function showMoreTags() {
    setTagLength(tagLength + 3)
    //  updateTags()
  }

  function onHandleTag(event) {
    event.preventDefault();
    let tag = event.target.tag.value;
    if (tag != undefined && tag != "") {
      tag = tag.toLowerCase();
      // let _id = props.response.dashboard.response.post[0]._id;
      let _id = props.post._id;
      const data = {
        tag,
        _id
      };
      //  console.log(data);
      props.dispatch(tagAction(data));
      // Parent add - defunct for now
      /*
      let parent;
      for (var tagCategory in tagCategories) {
        let tagValues = tagCategories[tagCategory];
        if (tagValues.indexOf(tag) > -1) {
          parent = tagCategory;
        }
      }
      let obj;
      console.log(tags);
      if (tags) {
        obj = tags.find(o => o.text === parent);
      } else if (tag == parent) {
        obj = tag;
      }
      console.log(parent);
      console.log(obj);
     // if (parent != undefined && obj == undefined) {
      if(parent!=undefined){

        const parentData = {
          tag: parent,
          _id,
          isParent: true
        }
        console.log(parentData);
        props.dispatch(tagAction(parentData)); 
      } */
    }
    setTagToAdd("")
  }
  //      <Textarea value={commentToAdd} onChange={e=> setCommentToAdd(e.target.value)}/>
  //getTagsForOnePost(props.post._id)
  // <button onClick={() => getCommentsForOnePost(props.post._id)}>Get Comments</button>
  // <button onClick={() => getTagsForOnePost(props.post._id)}>Get Tags</button>
  //      <iframe width="300" height="300" src={getEmbed(props.post.link)} frameBorder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture">
  // </iframe>
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
        <h3>{props.post.source}</h3>
        <h4>{props.post.name}</h4>
        <a className="postLink" href={props.post.link} target="_blank">{props.post.link}</a>
        <br />
        <button className="btn btn-pumpkin btn-centered borderImage" onClick={() => setPlayVideo(!playVideo)}>{playVideo ? "Close Song" : "Play Song"}</button>
        {playVideo && <iframe className="videoIframe" width="350" height="150" src={getEmbed(props.post.link)} frameBorder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture">
        </iframe>}
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