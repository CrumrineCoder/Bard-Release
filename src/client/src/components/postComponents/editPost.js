import React from "react";

function editPost(props) {
  return (
    <div className="updatePostForm">
      <div className="dashboardToolLabel">
        <label htmlFor="link">
          Link{" "}
          <input
            className="dashboardToolInput borderImage"
            value={props.link}
            onChange={e => props.setPostUpdatedLink(e.target.value)}
            autoComplete="off"
            type="link"
            name="link"
            id="link"
          />
        </label>
      </div>
      <div className="dashboardToolLabel">
        <label htmlFor="source">
          Source{" "}
          <input
            className="dashboardToolInput borderImage"
            value={props.postUpdatedSource}
            onChange={e => props.setPostUpdatedSource(e.target.value)}
            autoComplete="off"
            type="source"
            name="source"
            id="source"
          />
        </label>
      </div>
      <div className="dashboardToolLabel">
        <label htmlFor="name">
          Name{" "}
          <input
            className="dashboardToolInput borderImage"
            value={props.postUpdatedName}
            onChange={e => props.setPostUpdatedName(e.target.value)}
            autoComplete="off"
            type="name"
            name="name"
            id="name"
          />
        </label>
      </div>
      <div>
        <button
          className="btn btn-post smallBtn borderImage"
          onClick={() => props.editPost()}
          type="submit"
        >
          Update
        </button>
        <button
          className="btn btn-vermillion smallBtn borderImage"
          onClick={() => props.setOpenPostEdit(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default editPost;
