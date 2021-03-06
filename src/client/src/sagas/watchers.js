import { takeLatest, takeEvery } from 'redux-saga/effects';
import { registerSaga, loginSaga, getCurrentUserSaga } from './authenticationSaga';
import {postSaga, getAllSaga, commentSaga, getCommentsForOnePostSaga, getTagsForOnePostSaga, postTagSaga, searchPostsByTagSaga, getPostByIDSaga, checkTagSaga, checkSourceSaga, removeUserFromTagSaga, deleteCommentSaga, editCommentSaga, editPostSaga, getAllTagsSaga, updateLinkSaga} from "./dashboardSaga"

import * as types from '../actions';
//import * as login from '../actions/constants/login.js'

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
  yield takeEvery(types.GET_ALL_TAGS, getAllTagsSaga);
  yield takeEvery(types.SEARCH_POSTS_BY_TAG, searchPostsByTagSaga);
  yield takeEvery(types.CHECK_SOURCE, checkSourceSaga);
  yield takeEvery(types.GET_CURRENT_USER, getCurrentUserSaga);
  yield takeEvery(types.REMOVE_USER_FROM_TAG, removeUserFromTagSaga)
  yield takeEvery(types.DELETE_COMMENT, deleteCommentSaga)
  yield takeEvery(types.EDIT_COMMENT, editCommentSaga)
  yield takeEvery(types.EDIT_POST, editPostSaga)
  yield takeEvery(types.UPDATE_LINK, updateLinkSaga)
}

