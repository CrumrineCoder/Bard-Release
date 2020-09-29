import { getCookie } from "../utils/cookies";

export const postService = request => {
  //   console.log(request);
  const POST_API_ENDPOINT = "/api/posts/createPost";
  let authToken = getCookie("token");
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
      Authorization: "Bearer" + authToken
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

export const commentService = request => {
  //   console.log(request);
  const POST_API_ENDPOINT = "/api/comments/postComment";
  let authToken = getCookie("token");
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
      Authorization: "Bearer" + authToken
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

export const getAllPostsService = request => {
  const GET_API_ENDPOINT = "/api/posts/getAllPosts";
  let authToken = getCookie("token");
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + authToken
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

export const getPostsByIDService = request => {
  //  console.log(request);
  const POST_API_ENDPOINT = "/api/posts/getPostById/";
  let authToken = getCookie("token");
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + authToken
    },
    body: JSON.stringify(request.post)
  };
  return fetch(POST_API_ENDPOINT, parameters)
    .then(response => {
      //      console.log(response.clone().json())
      return response.clone().json();
    })
    .then(json => {
      //     console.log(json);
      return json;
    });
};

export const getAllCommentsForOnePost = request => {
  const GET_API_ENDPOINT = "/api/comments/getCommentsForPost/" + request.post;
  let authToken = getCookie("token");
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + authToken
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

export const getAllTagsForOnePost = request => {
  const GET_API_ENDPOINT = "/api/tags/getTagsForPost/" + request.post;
  let authToken = getCookie("token");
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + authToken
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

export const checkTagService = request => {
  //console.log(request);

  const GET_API_ENDPOINT = "/api/tags/checkTags/" + request.post.searchTag;
  let authToken = getCookie("token");
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + authToken
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

export const getAllTagsService = request => {
  //console.log(request);

  const GET_API_ENDPOINT = "/api/tags/getAllTags/";
  let authToken = getCookie("token");
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + authToken
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

export const searchPostsByTagService = request => {
  //  console.log(request);
  //const GET_API_ENDPOINT = '/api/tags/searchPostsByTag/' + request.post.searchTag;
  const GET_API_ENDPOINT = "/api/tags/searchPostsByTag/";
  let authToken = getCookie("token");
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + authToken
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

export const postTagService = request => {
  //   console.log(request);
  const POST_API_ENDPOINT = "/api/tags/postTag";
  let authToken = getCookie("token");
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
      Authorization: "Bearer" + authToken
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

export const checkSourceService = request => {
  // console.log(request);

  const GET_API_ENDPOINT =
    "/api/posts/checkSource/" + request.post.searchSource;
  let authToken = getCookie("token");
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + authToken
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

export const removeUserFromTagService = request => {
  //   console.log(request);
  const POST_API_ENDPOINT = "/api/tags/removeUserFromTag";
  let authToken = getCookie("token");
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
      Authorization: "Bearer" + authToken
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

export const deleteCommentService = request => {
  //   console.log(request);
  const POST_API_ENDPOINT = "/api/comments/deleteComment";
  let authToken = getCookie("token");
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
      Authorization: "Bearer" + authToken
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

export const editCommentService = request => {
  //console.log(request);
  const POST_API_ENDPOINT = "/api/comments/editComment";
  let authToken = getCookie("token");
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
      Authorization: "Bearer" + authToken
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

export const editPostService = request => {
  //console.log(request);
  const POST_API_ENDPOINT = "/api/posts/editPost";
  let authToken = getCookie("token");
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      withCredentials: true,
      Authorization: "Bearer" + authToken
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

export const updateLinkService = request => {
  /*
  const POST_API_ENDPOINT = '/api/posts/updateLink';
  let authToken = getCookie('token');
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      withCredentials: true,
      'Authorization': 'Bearer' + authToken
    },
    body: JSON.stringify(request),
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
    */
  /*

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  function execute() {
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "order": "viewCount",
      "q": "skateboarding dog",
      "type": [
        "video"
      ],
      "videoDefinition": "high"
    })
        .then(function(response) {
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });
</script>
<button onclick="authenticate().then(loadClient)">authorize and load</button>
<button onclick="execute()">execute</button>

*/
  console.log("test");
  console.log(request)
  const GET_API_ENDPOINT =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + request.post.source + " " + request.post.name + "&type=video&key=AIzaSyCMpnY6u8uVUzDunfsI_DvAUxDwqRDE9o8";
    console.log(GET_API_ENDPOINT)
  /*
  return fetch(GET_API_ENDPOINT)
    .then(response => {
      return response.clone().json();
    })
    .then(json => {
      console.log(json.items[0].id.videoId);
      return json;
    });
  */
  fetch(GET_API_ENDPOINT)
    .then(response => {
      return response.clone().json();
    })
    .then(json => {
      console.log(json.items[0].id.videoId);
      //return json;
      let newPost = request.post;
      newPost.link = "https://www.youtube.com/watch?v=" + json.items[0].id.videoId; 
      console.log(newPost)
      const POST_API_ENDPOINT = "/api/posts/editPost";
      let authToken = getCookie("token");
      const parameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          withCredentials: true,
          Authorization: "Bearer" + authToken
        },
        body: JSON.stringify(newPost),
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
    });
};
