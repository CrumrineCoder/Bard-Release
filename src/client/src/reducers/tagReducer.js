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
        default:
            return state;
    }
};

