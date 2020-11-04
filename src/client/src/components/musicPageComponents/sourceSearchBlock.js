import React from "react";
import { connect } from "react-redux";

function sourceSearchBlock(props) {
  return (
    <div className="musicPageOptionsContainer">
      <div className="musicSearchContainer">
        <input
          className="musicListingSourceSearchBar borderImage"
          placeholder="Search by sources [separated by commas]"
          onKeyDown={props._handleKeyDown}
          autoComplete="off"
          value={props.sourcesToFilterBy}
          onChange={e => props.setSourcesToFilterBy(e.target.value)}
          type="searchSource"
          name="searchSource"
          id="searchSource"
        ></input>
      </div>
      <button
        className="reverseSortingButton borderImage btn-pumpkin"
        onClick={() => {
          props.reverseSorting();
        }}
      >
        <i className="fas fa-sort"></i> Reverse Sorting
      </button>
      <button
        className="reverseSortingButton borderImage btn-pumpkin"
        onClick={() => {
          props.setShowAllTags(!props.showAllTags);
        }}
      >
        <i class="fas fa-tags"></i> All Tags
      </button>
      {props.showAllTags &&
        props.alphabetAllTags.map(function(tag) {
          return (
            <li
              className="tagBubble borderImage smallTagBubble"
              onClick={() => {
                submitTag(tag._id);
              }}
              key={tag._id}
            >
              {tag._id}
            </li>
          );
        })}
    </div>
  );
}
const mapStateToProps = response => ({ response });
export default connect(mapStateToProps)(sourceSearchBlock);
