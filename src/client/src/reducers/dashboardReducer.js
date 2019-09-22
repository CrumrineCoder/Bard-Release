import * as types from '../actions';

export default function (state = [], action) {
  let response = action.response;
  //  console.log(action);
  switch (action.type) {
    case types.MAKE_POST_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.MAKE_POST_ERROR:
      return { ...state, response };
    case types.MAKE_COMMENT_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.MAKE_COMMENT_ERROR:
      return { ...state, response };
    case types.GET_ALL_POSTS_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.GET_ALL_POSTS_ERROR:
      return { ...state, response };
    case types.GET_POST_BY_ID_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.GET_POST_BY_ID_ERROR:
      return { ...state, response };
    case types.GET_COMMENTS_FOR_ONE_POST_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.GET_COMMENTS_FOR_ONE_POST_ERROR:
      return { ...state, response };
    case types.GET_TAGS_FOR_ONE_POST_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.GET_TAGS_FOR_ONE_POST_ERROR:
      return { ...state, response };
    case types.MAKE_TAG_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.MAKE_TAG_ERROR:
      return { ...state, response };
    case types.CHECK_TAG_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.CHECK_TAG_ERROR:
      return { ...state, response };
    case types.SEARCH_POSTS_BY_TAG_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.SEARCH_POSTS_BY_TAG_ERROR:
      return { ...state, response };
    case types.CHECK_SOURCE_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.CHECK_SOURCE_ERROR:
      return { ...state, response };
    case types.REMOVE_USER_FROM_TAG_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.REMOVE_USER_FROM_TAG_ERROR:
      return { ...state, response };
    case types.DELETE_COMMENT_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.DELETE_COMMENT_ERROR:
      return { ...state, response };
    case types.EDIT_COMMENT_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.EDIT_COMMENT_ERROR:
      return { ...state, response };
    case types.EDIT_POST_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.EDIT_POST_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}