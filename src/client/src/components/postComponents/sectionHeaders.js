import React from "react";

function sectionHeaders(props) {
  return (
    <div className="postChooseSectionContainer">
      <span
        className={
          props.section == "tags"
            ? "postChooseSectionLink active"
            : "postChooseSectionLink"
        }
        onClick={() => props.setSection("tags")}
      >
        Tags
      </span>

      <span
        className={
          props.section == "notes"
            ? "postChooseSectionLink active"
            : "postChooseSectionLink"
        }
        onClick={() => props.setSection("notes")}
      >
        {props.comments.length > 0 && (
          <p className="postChooseSectionNoteNumber">
            {props.comments.length > 9 ? "9+" : props.comments.length}
          </p>
        )}
        Notes
      </span>
    </div>
  );
}
export default sectionHeaders;
