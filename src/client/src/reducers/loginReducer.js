import * as types from '../actions';

export function login (state = {}, action) {
 // const response = action.response;
  console.log(action.response);
  const user = action.user;
  //  console.log(response);
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      //   console.log(response);
      return { ...state, user: action.response};
    case types.LOGIN_USER_ERROR:
      return { ...state, user };
    case types.GET_CURRENT_USER_SUCCESS:
      return { user: action.response};
    case types.GET_CURRENT_USER_ERROR:
      return { ...state, user }
    case types.LOGOUT_USER:
      //   console.log(response);
      return { ...state, user: { success: false } };
    default:
      return {...state};
  }
};

