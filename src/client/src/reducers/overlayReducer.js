import * as types from '../actions';

export default function overlay(state = {}, action) {
   // console.log("tset");
  //  console.log(state);
    switch (action.type) {
        case types.TOGGLE_OVERLAY:
            console.log(state);
            if(state.response){
                return { ...state, response: { overlay: !state.response.overlay } };
            } else{
                return { ...state, response: { overlay: true } };
            }
        case types.TURNOFF_OVERLAY:
            console.log(state.response);
            return { ...state, response: { overlay: false } };
        case types.TURNON_OVERLAY:
            console.log(state);
            return { ...state, response: { overlay: true } };
        default:
            return { ...state };
    }
};

