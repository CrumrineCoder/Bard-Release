import { takeLatest, takeEvery } from 'redux-saga/effects';
import { registerSaga, loginSaga } from './authenticationSaga';
import {postSaga, getAllSaga, commentSaga, getCommentsForOnePostSaga, getTagsForOnePostSaga, postTagSaga, searchPostsByTagSaga, getPostByIDSaga, checkTagSaga, checkSourceSaga} from "./dashboardSaga"

import * as types from '../actions';


export default function* watchUserAuthentication() {

  yield takeLatest(types.REGISTER_USER, registerSaga);
  yield takeLatest(types.LOGIN_USER, loginSaga);
  // yield takeLatest(types.LOGOUT_USER, logoutSaga);
  yield takeLatest(types.MAKE_POST, postSaga);
  yield takeLatest(types.GET_ALL_POSTS, getAllSaga);
  yield takeEvery(types.GET_POST_BY_ID, getPostByIDSaga);
  yield takeLatest(types.MAKE_COMMENT, commentSaga);
  yield takeEvery(types.GET_COMMENTS_FOR_ONE_POST, getCommentsForOnePostSaga);
  yield takeLatest(types.MAKE_TAG, postTagSaga);
  yield takeEvery(types.GET_TAGS_FOR_ONE_POST, getTagsForOnePostSaga);
  yield takeEvery(types.CHECK_TAG, checkTagSaga);
  yield takeEvery(types.SEARCH_POSTS_BY_TAG, searchPostsByTagSaga);
  yield takeEvery(types.CHECK_SOURCE, checkSourceSaga);

  
}

