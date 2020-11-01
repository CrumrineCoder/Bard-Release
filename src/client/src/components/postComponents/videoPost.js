import React from 'react';

function videoPost(props) {
  function getHQ(link) {
    let id = getID(link);
    let embedLink = "https://img.youtube.com/vi/" + id + "/mqdefault.jpg";
    return embedLink;
  }
  function getID(str) {
    return str.split("v=")[1];
  }

  function getEmbed(link) {
    let embedLink = link.replace(
      "https://www.youtube.com/watch?v=",
      "https://www.youtube.com/embed/"
    );
    embedLink += "?autoplay=1";
    return embedLink;
  }
  return (
    <div className="postVideoContainer">
        {props.playVideo ? (
          <iframe
            className="videoIframe"
            width="350"
            height="150"
            src={getEmbed(props.link)}
            frameBorder="0"
            allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture"
          >
            {" "}
          </iframe>
        ) : (
          <div
            onClick={() => props.setPlayVideo(true)}
            className="videoPreviewContainer"
          >
            <img className="videoPreview" src={getHQ(props.link)} />
            <i className="fa fa-play videoPreviewIcon" />
          </div>
        )}
      </div>

  )
}
export default (videoPost);