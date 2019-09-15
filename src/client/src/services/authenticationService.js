export const registerUserService = (request) => {
  //  console.log(request);
    const REGISTER_API_ENDPOINT = '/api/users';
    
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.user)
    };
  
    return fetch(REGISTER_API_ENDPOINT, parameters)
      .then(response => {
     //   console.log(response.clone().json())
        return response.clone().json();
      })
      .then(json => {
    //    console.log(json);
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