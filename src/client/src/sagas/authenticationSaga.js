import { put, call } from 'redux-saga/effects';
import { registerUserService, loginUserService, getCurrentUserService } from '../services/authenticationService';

import * as types from '../actions'

export function* registerSaga(payload) {
  //  console.log(payload);
  try {
    const response = yield call(registerUserService, payload);
    yield put({ type: types.REGISTER_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.REGISTER_USER_ERROR, error });
  }
}

export function* loginSaga(payload) {
  //  console.log(payload);
  try {
    const response = yield call(loginUserService, payload);
    //   console.log(response);
    //    console.log(types.LOGIN_USER_SUCCESS)
    yield put({ type: types.LOGIN_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.LOGIN_USER_ERROR, error })
  }
}

export function* getCurrentUserSaga(payload) {
  //console.log(payload);
  try {
    const response = yield call(getCurrentUserService, payload);
    //console.log(response);
    //    console.log(types.LOGIN_USER_SUCCESS)
    yield put({ type: types.GET_CURRENT_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.GET_CURRENT_USER_ERROR, error })
  }
}

// export function* logoutSaga(payload) {
//   //  console.log(payload);
//     try {
//       const response = yield call(logoutUserService, payload);
//    //   console.log(response);
//   //    console.log(types.LOGIN_USER_SUCCESS)
//       yield put({ type: types.LOGOUT_USER_SUCCESS, response });
//     } catch(error) {
//       yield put({ type: types.LOGOUT_USER_ERROR, error })
//     }
//   }