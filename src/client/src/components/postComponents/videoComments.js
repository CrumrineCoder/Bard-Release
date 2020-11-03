import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getAllPostsAction,
  commentAction,
} from "../../actions/linkActions";

function videoComments(props) {
  const [commentToAdd, setCommentToAdd] = useState("");

  function onHandleComment(event) {
    event.preventDefault();
    let comment = event.target.comment.value;
    let _id = props.postID;
    const data = {
      comment,
      _id
    };
    props.dispatch(commentAction(data));
    props.dispatch(getAllPostsAction());
    setCommentToAdd("");
  }

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className="postCommentContainer">
      {props.commentChain}
      {props.loggedIn}
      {props.loggedIn ? (
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
  );
}

const mapStateToProps = response => ({ response });
export default connect(mapStateToProps)(videoComments);
