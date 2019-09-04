import * as types from './index';

export const registerUserAction = (user) => {
  //console.log(user);
  return {
    type: types.REGISTER_USER,
    user
  }
};

export const loginUserAction = (user) => {
  //console.log(user);
  return {
    type: types.LOGIN_USER,
    user
  }
};

export const logoutUserAction = (user) => {
  //console.log(user);
  return {
    type: types.LOGOUT_USER,
    user
  }
};