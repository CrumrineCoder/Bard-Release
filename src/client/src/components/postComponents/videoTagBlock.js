import React from "react";
import { connect } from "react-redux";
import { removeUserFromTagAction } from "../../actions/linkActions";
function videoTagBlock(props) {
  function removeUserFromTag(tag) {
    /*
        let category = tags.find(function (el) {
          return el.text === tag.category;
        })
        if (category) {
          props.dispatch(removeUserFromTagAction({ tag: category._id, user: props.currentUser, postID: props.post._id, text: category.text }));
        }
        */
    props.dispatch(
      removeUserFromTagAction({
        tag: tag._id,
        user: props.currentUser,
        postID: props.postID,
        text: tag.text
      })
    );
  }
  
  return (
    <div className="postsTags">
      {props.visualTags.slice(0, props.tagLength).map(function(tag) {
        if (tag.emails.indexOf(props.currentUser) != -1) {
          return (
            <li
              className="tagBubble borderImage removeBubble smallTagBubble editableTagBubble"
              onClick={e => removeUserFromTag(tag)}
              key={tag._id}
            >
              {tag.text}
              <i className="fas fa-times marginLeftIcon iconAction removeIcon"></i>
            </li>
          );
        } else {
          return (
            <li className="tagBubble borderImage smallTagBubble" key={tag._id}>
              {tag.text}
            </li>
          );
        }
      })}
      {props.tagLength < props.visualTags.length && (
        <i
          className="fas fa-arrow-circle-right showMoreTags"
          onClick={e => props.showMoreTags()}
        ></i>
      )}
    </div>
  );
}
const mapStateToProps = response => ({ response });
export default connect(mapStateToProps)(videoTagBlock);
