import * as types from '../actions';

export default function tags(state = {}, action) {
    // console.log("tset");
    let response = action.response;
    //  console.log(state);
    switch (action.type) {
        case types.GET_ALL_TAGS_SUCCESS:
            //    console.log(response);
            return { ...state, response };
        case types.GET_ALL_TAGS_ERROR:
            return { ...state, response };
        case types.GET_TAGS_FOR_ONE_POST_SUCCESS:
            //console.log(response);
            return { ...state, response };
        case types.GET_TAGS_FOR_ONE_POST_ERROR:
            return { ...state, response };
        case types.SEARCH_POSTS_BY_TAG_SUCCESS:
            //    console.log(response);
            return { ...state, response };
        case types.SEARCH_POSTS_BY_TAG_ERROR:
            return { ...state, response };
        case types.REMOVE_USER_FROM_TAG_SUCCESS:
            //    console.log(response);
            return { ...state, response };
        case types.REMOVE_USER_FROM_TAG_ERROR:
            return { ...state, response };
        case types.CHECK_TAG_SUCCESS:
            //    console.log(response);
            return { ...state, response };
        case types.CHECK_TAG_ERROR:
            return { ...state, response };
        case types.MAKE_TAG_SUCCESS:
            //    console.log(response);
            return { ...state, response };
        case types.MAKE_TAG_ERROR:
            return { ...state, response };
        default:
            return state;
    }
};

