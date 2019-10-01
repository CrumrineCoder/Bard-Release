import * as types from '../actions';

export default function searchTags(state = [], action) {
    // console.log("tset");
    let response = action.response;
      console.log(state);
      console.log(response);
      console.log(action);
    switch (action.type) {
        case types.ADD_SEARCH_TAGS:
       /*     if(state.response){
                return { ...state, response: { overlay: !state.response.overlay } };
            } else{
                return { ...state, response: { overlay: true } };
            } */
            console.log(response);
            console.log(state.response);
        default:
            return state;
    }
};

