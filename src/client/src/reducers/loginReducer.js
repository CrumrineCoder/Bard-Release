import * as types from '../actions';

export function login (state = {}, action) {
  const user = action.user;
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return { ...state, user: action.response};
    case types.LOGIN_USER_ERROR:
      return { ...state, user };
    case types.GET_CURRENT_USER_SUCCESS:
      return { user: action.response};
    case types.GET_CURRENT_USER_ERROR:
      return { ...state, user }
    case types.LOGOUT_USER:
      return { ...state, user: { success: false } };
    default:
      return {...state};
  }
};

