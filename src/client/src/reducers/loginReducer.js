import * as types from '../actions';

export default function (state = [], action) {
  const response = action.response;
  //  console.log(response);
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      //   console.log(response);
      return { ...state, response };
    case types.LOGIN_USER_ERROR:
      return { ...state, response };
    case types.LOGOUT_USER:
      //   console.log(response);
      return { ...state, response: {success: false}};
    default:
      return state;
  }
};