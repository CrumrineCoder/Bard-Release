import React from "react";

function videoIcons(props) {
  return (
    <>
      <div className="postVideoIcons">
        {props.email == props.currentUser && (
          <>
            <i
              onClick={() => {
                props.updateLinkAutomatically();
              }}
              className="fas fa-sync marginIcon postEditButton iconAction editIcon"
            ></i>
            <i
              onClick={() => {
                props.setOpenPostEdit(true);
              }}
              className="fas fa-edit marginIcon postEditButton iconAction editIcon"
            ></i>
          </>
        )}

        <i
          onClick={() => {
            navigator.clipboard.writeText(props.link);
            setCopied(true);
          }}
          className="fas fa-link editIcon iconAction"
        ></i>
      </div>
      <div className="postVideoHeader">
        <h3>{props.source}</h3>
        <h4>{props.name}</h4>
      </div>
    </>
  );
}
export default videoIcons;
