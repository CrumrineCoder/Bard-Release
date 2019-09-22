import { put, call  } from 'redux-saga/effects';
import { postService, getAllPostsService, commentService, getAllCommentsForOnePost, getAllTagsForOnePost, postTagService, searchPostsByTagService, getPostsByIDService, checkTagService, checkSourceService, removeUserFromTagService, deleteCommentService} from '../services/dashboardService';

import * as types from '../actions';

export function* postSaga(payload) {
  // console.log(payload);
  try {
    const response = yield call(postService, payload);
    yield put({ type: types.MAKE_POST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.MAKE_POST_ERROR, error });
  }
}

export function* getAllSaga(payload) {
  // console.log(payload);
  try {
    const response = yield call(getAllPostsService, payload);
    yield put({ type: types.GET_ALL_POSTS_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.GET_ALL_POSTS_ERROR, error });
  }
}

export function* getPostByIDSaga(payload) {
  // console.log(payload);
  try {
    const response = yield call(getPostsByIDService, payload);
    yield put({ type: types.GET_POST_BY_ID_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.GET_POST_BY_ID_ERROR, error });
  }
}

export function* commentSaga(payload) {
  // console.log(payload);
  try {
    const response = yield call(commentService, payload);
    yield put({ type: types.MAKE_COMMENT_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.MAKE_COMMENT_ERROR, error });
  }
}

export function* getCommentsForOnePostSaga(payload) {
  // console.log(payload);
  try {
    const response = yield call(getAllCommentsForOnePost, payload);
    yield put({ type: types.GET_COMMENTS_FOR_ONE_POST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.GET_COMMENTS_FOR_ONE_POST_ERROR, error });
  }
}

export function* getTagsForOnePostSaga(payload) {
  try {
    const response = yield call(getAllTagsForOnePost, payload);
    yield put({ type: types.GET_TAGS_FOR_ONE_POST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.GET_TAGS_FOR_ONE_POST_ERROR, error });
  }
}

export function* postTagSaga(payload) {
  // console.log(payload);
  try {
    const response = yield call(postTagService, payload);
    yield put({ type: types.MAKE_TAG_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.MAKE_TAG_ERROR, error });
  }
}

export function* checkTagSaga(payload) {
  //console.log(payload);
  try {
    const response = yield call(checkTagService, payload);
    yield put({ type: types.CHECK_TAG_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.CHECK_TAG_ERROR, error });
  }
}

export function* searchPostsByTagSaga(payload) {
  //console.log(payload);
  try {
    const response = yield call(searchPostsByTagService, payload);
    yield put({ type: types.SEARCH_POSTS_BY_TAG_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.SEARCH_POSTS_BY_TAG_ERROR, error });
  }
}

export function* checkSourceSaga(payload) {
  //console.log(payload);
  try {
    const response = yield call(checkSourceService, payload);
    yield put({ type: types.CHECK_SOURCE_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.CHECK_SOURCE_ERROR, error });
  }
}

export function* removeUserFromTagSaga(payload) {
  //console.log(payload);
  try {
    const response = yield call(removeUserFromTagService, payload);
    yield put({ type: types.REMOVE_USER_FROM_TAG_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.REMOVE_USER_FROM_TAG_ERROR, error });
  }
}

export function* deleteCommentSaga(payload) {
  //console.log(payload);
  try {
    const response = yield call(deleteCommentService, payload);
    yield put({ type: types.DELETE_COMMENT_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.DELETE_COMMENT_ERROR, error });
  }
}
