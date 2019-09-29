import * as types from '../actions';

export default function comments(state = {}, action) {
    // console.log("tset");
    let response = action.response;
    //   console.log(response)
    //  console.log(state);
    switch (action.type) {
        case types.MAKE_COMMENT_SUCCESS:
            return { ...state, response };
        case types.MAKE_COMMENT_ERROR:
            return { ...state, response };
        case types.GET_COMMENTS_FOR_ONE_POST_SUCCESS:
            //    console.log(response);
            return { ...state, response };
        case types.GET_COMMENTS_FOR_ONE_POST_ERROR:
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
        default:
            return state;
    }
};

