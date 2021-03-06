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
    
    case types.CHECK_SOURCE_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.CHECK_SOURCE_ERROR:
      return { ...state, response };
    case types.EDIT_POST_SUCCESS:
      //    console.log(response);
      return { ...state, response };
    case types.EDIT_POST_ERROR:
      return { ...state, response };
    case types.UPDATE_LINK_SUCCESS:
      return { ...state, response };
    case types.UPDATE_LINK_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}