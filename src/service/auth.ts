import { storeTokenInCookies } from "./cookieToken";

 
 
export const authToken = async (credentials: { username: string; password: string, email: string }) => {
  const response = await fetch('https://thorough-unity-production.up.railway.app/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Credenciales incorrectas');
  }

  const data = await response.json();
  const token = Array.isArray(data.token) ? data.token[0] : data.token;
  console.log("TOKEN GUARDADO", token);
  storeTokenInCookies(token);
};
