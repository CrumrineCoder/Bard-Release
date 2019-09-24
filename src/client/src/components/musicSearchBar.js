import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getAllPostsAction, searchPostsByTag, checkTagsAction, swapOverlayAction, turnoffOverlayAction, turnonOverlayAction, toggleOverlayAction } from '../actions/linkActions';

import tagCategories from "../utils/tagCategories";

function MusicSearchBar(props) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [autocompleteTagsLength, setAutocompleteTagsLength] = useState(0);
    const [autocompleteTags, setAutocompleteTags] = useState("");

    const [searchTags, setSearchTags] = useState([]);
    const [tagToAdd, setTagToAdd] = useState("");

    const [suggestedTags, setSuggestedTags] = useState([]);

    String.prototype.isEmpty = function() {
        return (this.length === 0 || !this.trim());
    };

    function onSearchTag(tag) {
        let localTagToAdd;
        tag != undefined ? localTagToAdd = tag : localTagToAdd = tagToAdd;
        if (!localTagToAdd.isEmpty()) {
            let newTags = searchTags;
            newTags.push(localTagToAdd);
            let checkTags = newTags.map(str => str.replace(/\s/g, ''));
            checkTags = checkTags.filter(Boolean);
            if (checkTags.length) {
                newTags = newTags.filter(function (el) {
                    return el != null;
                });

                setSearchTags(newTags);
                setTagToAdd("")
                props.dispatch(searchPostsByTag(newTags));

                let categories = [];
                let inclusiveTags = [];

                for (var tagCategory in tagCategories) {
                    let tagValues = tagCategories[tagCategory];
                    for (var i = 0; i < newTags.length; i++) {
                        if (tagValues.indexOf(newTags[i]) > -1) {
                            categories.push(tagCategories[tagCategory]);
                            categories = categories.flat(Infinity);
                        }
                    }
                }
                inclusiveTags.push(categories);
                inclusiveTags = inclusiveTags.flat(Infinity);
                inclusiveTags = inclusiveTags.filter((el) => !newTags.includes(el));
                inclusiveTags = [...new Set(inclusiveTags)];
                setSuggestedTags(inclusiveTags);
            }
        }
    }

    function removeTag(tag) {
        let newTags = searchTags;
        let tagToRemoveIndex = newTags.indexOf(tag);

        if (tagToRemoveIndex > -1) {
            newTags.splice(tagToRemoveIndex, 1);
        }
        setSearchTags(newTags);

        if (newTags.length) {
            props.dispatch(searchPostsByTag(newTags))
        } else {
            props.dispatch(getAllPostsAction());
            setSuggestedTags([]);
        }
    }

    function _handleKeyDown(e) {
      //  props.dispatch(turnoffOverlayAction());
        if (e.key === 'Enter') {
            onSearchTag();
        }
    }

    useEffect(() => {
        let searchTag = tagToAdd.toLowerCase().trim();
        if (searchTag) {
            const data = {
                searchTag
            };
            props.dispatch(checkTagsAction(data));
        } else {
            setAutocompleteTagsLength(0);
            setAutocompleteTags(<></>);
        }
    }, [tagToAdd])

    useEffect(() => {
     //   console.log(props.response.dashboard.response);
        if (props.response.dashboard.response != undefined) {
            if (props.response.dashboard.response.message == "Successfully created new post.") {
                props.dispatch(getAllPostsAction());
                props.dispatch(turnoffOverlayAction());
           //     props.dispatch(turnoffOverlayAction());
            }

            setIsSuccess(props.response.dashboard.response.success);
            setMessage(props.response.dashboard.response.message);
            if (props.response.dashboard.response.message == "Check tags done.") {
                setAutocompleteTagsLength(props.response.dashboard.response.tag.length);
                setAutocompleteTags(
                    <ul className="tagSuggestionsContainer borderImage">
                        {props.response.dashboard.response.tag.map(tag =>
                            <li className="tagSuggestion" onClick={() => { onSearchTag(tag._id) }}>
                                {tag._id}
                            </li>
                        )}
                    </ul>)
            }
        }
    }, [props.response.dashboard.response])

    useEffect(() => {
        if (props.location) {
            if (props.location.state) {
                onSearchTag(props.location.state);
            }
        }
    }, [])

    return (
        <div className="musicSearchAreaContainer">
            <div>
                {searchTags.map(tag =>
                    <li className="tagBubble borderImage removeBubble" onClick={() => { removeTag(tag) }}>
                        {tag}
                        <i className="fas fa-minus tagBubbleIcon"></i>
                    </li>
                )}
            </div>
            <div className="musicSearchContainer">
                <div className="musicSearchBarContainer">
                    <i className="fas fa-search musicSearchBarIcon" onClick={() => { onSearchTag() }}></i>
                    <input className="dashboardToolInput borderImage" placeholder="Search by tag" onKeyDown={_handleKeyDown} autoComplete="off" value={tagToAdd} onChange={e => setTagToAdd(e.target.value)} type="searchTag" name="searchTag" id="searchTag" />
                    {tagToAdd != "" &&
                        <i className="fas fa-times musicSearchBarCancelIcon" onClick={() => { setTagToAdd("") }}></i>
                    }
                </div>
                {autocompleteTagsLength > 0 && autocompleteTags}
            </div>
            <ul>
                {suggestedTags.map(tag =>
                    <li className="tagBubble borderImage addBubble" onClick={() => { onSearchTag(tag) }}>
                        {tag}
                        <i className="fas fa-plus tagBubbleIcon"></i>
                    </li>
                )}
            </ul>
        </div>
    )
}
const mapStateToProps = (response) => ({ response });
export default withRouter(connect(mapStateToProps)(MusicSearchBar));