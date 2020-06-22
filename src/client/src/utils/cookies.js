export function setCookie(cname, cvalue, hours) {
    let d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000)  + 9999999999999999999999999999999999999999); // (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
   // console.log(cvalue);
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }
  
  export function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) ===' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  
    return '';
  }

  export function deleteCookie(){
    document.cookie = "token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  }
  
  export function checkCookie() {
    let user = getCookie('token');
    if (user !== '') {
      return user;
    } else {
      return null;
    }
  }