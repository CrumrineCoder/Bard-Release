import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  deleteCommentAction,
  editCommentAction
} from "../../actions/linkActions";

function videoCommentBlock(props) {
  function deleteComment(comment) {
    props.dispatch(deleteCommentAction(comment));
  }
  function editComment(comment) {
    console.log(comment);
    comment["text"] = props.commentUpdatedText;
    props.dispatch(editCommentAction(comment));
    props.setOpenCommentEdit(false);
  }
  return (
    <div className="postsComments">
      {props.comments.map(function(comment, index) {
        if (comment.email == props.currentUser) {
          if (props.openCommentEdit == comment._id) {
            return (
              <label htmlFor="commentToBeEdited">
                <textarea
                  autoFocus
                  className="postCommentField borderImage"
                  value={props.commentUpdatedText}
                  rows="5"
                  cols="25"
                  autoComplete="off"
                  onChange={e => props.setCommentUpdatedText(e.target.value)}
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
                      props.setOpenCommentEdit(false);
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
                      props.setOpenCommentEdit(comment._id);
                      props.setCommentUpdatedText(comment.text);
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
}
const mapStateToProps = response => ({ response });
export default connect(mapStateToProps)(videoCommentBlock);
