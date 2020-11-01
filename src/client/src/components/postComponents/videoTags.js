import React from "react";

function videoTags(props) {
  function _handleKeyDown(e) {
    if (e.key === "Enter") {
      props.onHandleTag();
    }
  }
  return (
    <div className="postTagContainer">
      {props.tagChain}

      {props.loggedIn ? (
        <div className="postDashboardContainer">
          <div className="dashboardToolLabel">
            <input
              className="dashboardToolInput borderImage"
              placeholder={props.placeholderTag}
              onKeyDown={_handleKeyDown}
              value={props.tagToAdd}
              autoComplete="off"
              onChange={e => props.setTagToAdd(e.target.value)}
              type="tag"
              name="tag"
              id="tag"
            />{" "}
            <i
              className="addTagIcon marginLeftIcon fas fa-plus-square"
              onClick={props.onHandleTag}
            ></i>
          </div>
          {props.existingTags}
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
  );
}
export default videoTags;
