import * as types from './index';

import * as login from './constants/login.js';

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
    type: login.LOGIN_USER,
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

export const getCurrentUserAction = (user) =>{
  //console.log(user);
  return {
    type: types.GET_CURRENT_USER,
    user
  }
}