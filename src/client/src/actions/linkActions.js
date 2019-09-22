import * as types from './index';

export const postAction = (post) => {
  return {
    type: types.MAKE_POST,
    post
  }
};

export const getAllPostsAction = (post) => {
  return {
    type: types.GET_ALL_POSTS,
    post
  }
};

export const getPostsByIDAction = (post) => {
 // console.log(post); 
  return {
    type: types.GET_POST_BY_ID,
    post
  }
};

export const commentAction = (post) => {
  return {
    type: types.MAKE_COMMENT,
    post
  }
};

export const tagAction = (post) => {
  return {
    type: types.MAKE_TAG,
    post
  }
};

export const getAllCommentsForOnePostAction = (post) => {
  return {
    type: types.GET_COMMENTS_FOR_ONE_POST,
    post
  }
};

export const getAllTagsForOnePostAction = (post) => {
  return {
    type: types.GET_TAGS_FOR_ONE_POST,
    post
  }
};

export const checkTagsAction = (post) => {
  return {
    type: types.CHECK_TAG,
    post
  }
}

export const searchPostsByTag = (post) => {
  return {
    type: types.SEARCH_POSTS_BY_TAG,
    post
  }
}

export const checkSourcesAction = (post) => {
  return {
    type: types.CHECK_SOURCE,
    post
  }
}

export const removeUserFromTagAction = (post) => {
  return{
    type: types.REMOVE_USER_FROM_TAG, 
    post
  }
}

export const deleteCommentAction = (post) => {
  return{
    type: types.DELETE_COMMENT, 
    post
  }
}

export const editCommentAction = (post) => {
  return{
    type: types.EDIT_COMMENT, 
    post
  }
}