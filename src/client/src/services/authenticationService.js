import { getCookie } from '../utils/cookies';
export const registerUserService = (request) => {
  //  console.log(request);
  const REGISTER_API_ENDPOINT = '/api/users/register';

  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request.user)
  };

  return fetch(REGISTER_API_ENDPOINT, parameters)
    .then(response => {
      console.log(response.clone().json())
      return response.clone().json();
    })
    .then(json => {
      console.log(json);
      return json;
    });
};

export const loginUserService = (request) => {
  //    console.log(request);
  const LOGIN_API_ENDPOINT = '/api/users/login';

  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request.user)
  };

  return fetch(LOGIN_API_ENDPOINT, parameters)
    .then(response => {
      return response.clone().json();
    })
    .then(json => {
      return json;
    });
};

export const getCurrentUserService = (request) => {
  //console.log(request);
  const LOGIN_API_ENDPOINT = '/api/users/current';
  let authToken = getCookie('token');
  //console.log(authToken);
  //console.log(authToken.slice(4, authToken.length));
  //let token = "Bearer " + authToken.slice(4, authToken.length);
  let token = "Bearer authToken";
  const parameters = {
    method: 'GET',
  //  withCredentials: true,
  //  credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
      withCredentials: true,
      'Authorization': 'Bearer' + authToken
    },
    credentials: "same-origin"
  };
  //console.log(parameters);
  //console.log(LOGIN_API_ENDPOINT);
  return fetch(LOGIN_API_ENDPOINT, parameters)
    .then(response => {
      //console.log(response.clone().json())
      return response.clone().json();
    })
    .then(json => {
      return json;
    });
}
/*
let authToken = getCookie('token');
  console.log(authToken);
  let token = 'Bearer' + authToken;
  const parameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': {
        token,
        'Content-Type': 'application/json'
      }
    }
  };
  */