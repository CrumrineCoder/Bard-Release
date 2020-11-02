import React from "react";

function videoComments(props) {
  return (
    <div className="postCommentContainer">
      {props.commentChain}
      {props.loggedIn ? (
        <form className="postDashboardContainer" onSubmit={props.onHandleComment}>
          <div>
            <label htmlFor="comment"></label>
            <textarea
              className="postCommentField borderImage"
              rows="5"
              cols="30"
              placeholder="Use in source, how it worked in a game or theorization, specifics of emotions"
              value={props.commentToAdd}
              onChange={e => props.setCommentToAdd(e.target.value)}
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
export default videoComments;
