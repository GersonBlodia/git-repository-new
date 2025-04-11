import Cookies from 'js-cookie';
 
export const storeTokenInCookies = (token: string) => {
  // Guardar el token en una cookie
  Cookies.set('authToken', token, { expires: 7, path: '/' });

};


 