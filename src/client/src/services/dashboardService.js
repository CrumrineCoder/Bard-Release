import { getCookie } from '../utils/cookies';

export const postService = (request) => {
  //   console.log(request);
  const POST_API_ENDPOINT = '/api/posts/createPost';
  let authToken = getCookie('token');
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      withCredentials: true,
      'Authorization': 'Bearer' + authToken
    },
    body: JSON.stringify(request.post),
    credentials: "same-origin"
    // credientials: 'include'
  };

  return fetch(POST_API_ENDPOINT, parameters)
    .then(response => {
      //     console.log(response.clone().json())
      return response.clone().json();
    })
    .then(json => {
      //     console.log(json);
      return json;
    });
};

export const commentService = (request) => {
  //   console.log(request);
  const POST_API_ENDPOINT = '/api/comments/postComment';
  let authToken = getCookie('token');
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      withCredentials: true,
      'Authorization': 'Bearer' + authToken
    },
    body: JSON.stringify(request.post),
    credentials: "same-origin"
    // credientials: 'include'
  };

  return fetch(POST_API_ENDPOINT, parameters)
    .then(response => {
      //     console.log(response.clone().json())
      return response.clone().json();
    })
    .then(json => {
      //     console.log(json);
      return json;
    });
};

export const getAllPostsService = (request) => {
  const GET_API_ENDPOINT = '/api/posts/getAllPosts';
  let authToken = getCookie('token');
  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + authToken
    }
  };

  return fetch(GET_API_ENDPOINT, parameters)
    .then(response => {
      //      console.log(response.clone().json())
      return response.clone().json();
    })
    .then(json => {
      //     console.log(json);
      return json;
    });
};

export const getPostsByIDService = (request) => {
//  console.log(request);
  const GET_API_ENDPOINT = '/api/posts/getPostById/'+ request.post;
  let authToken = getCookie('token');
  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + authToken
    }
  };

  return fetch(GET_API_ENDPOINT, parameters)
    .then(response => {
      //      console.log(response.clone().json())
      return response.clone().json();
    })
    .then(json => {
      //     console.log(json);
      return json;
    });
};



export const getAllCommentsForOnePost = (request) => {
  const GET_API_ENDPOINT = '/api/comments/getCommentsForPost/' + request.post;
  let authToken = getCookie('token');
  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + authToken
    }
  };

  return fetch(GET_API_ENDPOINT, parameters)
    .then(response => {
      //      console.log(response.clone().json())
      return response.clone().json();
    })
    .then(json => {
      //     console.log(json);
      return json;
    });
};

export const getAllTagsForOnePost = (request) => {
  const GET_API_ENDPOINT = '/api/tags/getTagsForPost/' + request.post;
  let authToken = getCookie('token');
  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + authToken
    }
  };

  return fetch(GET_API_ENDPOINT, parameters)
    .then(response => {
      return response.clone().json();
    })
    .then(json => {
      //     console.log(json);
      return json;
    });
};


export const checkTagService = (request) => {
  //console.log(request);

    const GET_API_ENDPOINT = '/api/tags/checkTags/' + request.post.searchTag;
    let authToken = getCookie('token');
    const parameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + authToken
      }
    };
  
    return fetch(GET_API_ENDPOINT, parameters)
      .then(response => {
        return response.clone().json();
      })
      .then(json => {
        //     console.log(json);
        return json;
      });
  };


export const getAllTagsService = (request) => {
  //console.log(request);

    const GET_API_ENDPOINT = '/api/tags/getAllTags/' 
    let authToken = getCookie('token');
    const parameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + authToken
      }
    };
  
    return fetch(GET_API_ENDPOINT, parameters)
      .then(response => {
        return response.clone().json();
      })
      .then(json => {
        //     console.log(json);
        return json;
      });
  };

export const searchPostsByTagService = (request) => {
 //  console.log(request);
  //const GET_API_ENDPOINT = '/api/tags/searchPostsByTag/' + request.post.searchTag;
  const GET_API_ENDPOINT = '/api/tags/searchPostsByTag/';
  let authToken = getCookie('token');
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + authToken
    },
    body: JSON.stringify(request.post)
  };

  return fetch(GET_API_ENDPOINT, parameters)
    .then(response => {
      return response.clone().json();
    })
    .then(json => {
      //     console.log(json);
      return json;
    });
};

export const postTagService = (request) => {
  //   console.log(request);
  const POST_API_ENDPOINT = '/api/tags/postTag';
  let authToken = getCookie('token');
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      withCredentials: true,
      'Authorization': 'Bearer' + authToken
    },
    body: JSON.stringify(request.post),
    credentials: "same-origin"
    // credientials: 'include'
  };

  return fetch(POST_API_ENDPOINT, parameters)
    .then(response => {
      //     console.log(response.clone().json())
      return response.clone().json();
    })
    .then(json => {
      //     console.log(json);
      return json;
    });
};

export const checkSourceService = (request) => {
 // console.log(request);

    const GET_API_ENDPOINT = '/api/posts/checkSource/' + request.post.searchSource;
    let authToken = getCookie('token');
    const parameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + authToken
      }
    };
  
    return fetch(GET_API_ENDPOINT, parameters)
      .then(response => {
        return response.clone().json();
      })
      .then(json => {
        //     console.log(json);
        return json;
      });
  };

  export const removeUserFromTagService = (request) => {
    //   console.log(request);
    const POST_API_ENDPOINT = '/api/tags/removeUserFromTag';
    let authToken = getCookie('token');
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        withCredentials: true,
        'Authorization': 'Bearer' + authToken
      },
      body: JSON.stringify(request.post),
      credentials: "same-origin"
      // credientials: 'include'
    };
  
    return fetch(POST_API_ENDPOINT, parameters)
      .then(response => {
        //     console.log(response.clone().json())
        return response.clone().json();
      })
      .then(json => {
        //     console.log(json);
        return json;
      });
  };


  export const deleteCommentService = (request) => {
    //   console.log(request);
    const POST_API_ENDPOINT = '/api/comments/deleteComment';
    let authToken = getCookie('token');
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        withCredentials: true,
        'Authorization': 'Bearer' + authToken
      },
      body: JSON.stringify(request.post),
      credentials: "same-origin"
      // credientials: 'include'
    };
  
    return fetch(POST_API_ENDPOINT, parameters)
      .then(response => {
        //     console.log(response.clone().json())
        return response.clone().json();
      })
      .then(json => {
        //     console.log(json);
        return json;
      });
  };



  export const editCommentService = (request) => {
    //console.log(request);
    const POST_API_ENDPOINT = '/api/comments/editComment';
    let authToken = getCookie('token');
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        withCredentials: true,
        'Authorization': 'Bearer' + authToken
      },
      body: JSON.stringify(request.post),
      credentials: "same-origin"
      // credientials: 'include'
    };
  
    return fetch(POST_API_ENDPOINT, parameters)
      .then(response => {
        //     console.log(response.clone().json())
        return response.clone().json();
      })
      .then(json => {
        //     console.log(json);
        return json;
      });
  };

  export const editPostService = (request) => {
    //console.log(request);
    const POST_API_ENDPOINT = '/api/posts/editPost';
    let authToken = getCookie('token');
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        withCredentials: true,
        'Authorization': 'Bearer' + authToken
      },
      body: JSON.stringify(request.post),
      credentials: "same-origin"
      // credientials: 'include'
    };
  
    return fetch(POST_API_ENDPOINT, parameters)
      .then(response => {
        //     console.log(response.clone().json())
        return response.clone().json();
      })
      .then(json => {
        //     console.log(json);
        return json;
      });
  };