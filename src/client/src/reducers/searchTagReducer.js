import * as types from '../actions';

export default function searchTags(state = {}, action) {
    // console.log("tset");
    let response = action.response;
    switch (action.type) {
        case types.ADD_SEARCH_TAGS:
       /*     if(state.response){
                return { ...state, response: { overlay: !state.response.overlay } };
            } else{
                return { ...state, response: { overlay: true } };
            } */
            return {...state, response: {tag: action.post} }
        default:
            return state;
    }
};

