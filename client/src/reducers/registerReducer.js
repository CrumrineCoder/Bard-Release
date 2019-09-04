import * as types from '../actions';

export default function(state = [], action) {
  let response = action.response;
 // console.log(action);
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS:
//      console.log(response);
      return { ...state, response };
    case types.REGISTER_USER_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}