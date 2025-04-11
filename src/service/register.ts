import { storeTokenInCookies } from './cookieToken';

interface FormData {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;
  username: string;
  password: string;
}

export const registerPost = async (data: FormData) => {
  try {
    // 1. Crear persona
    const personaResponse = await fetch('https://thorough-unity-production.up.railway.app/api/personas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombres: data.nombres,
        apellidos: data.apellidos,
        dni: data.dni,
        telefono: data.telefono,
        direccion: data.direccion,
        fecha_nacimiento: data.fecha_nacimiento,
      }),
    });

    if (!personaResponse.ok) {
      throw new Error('Error al registrar persona');
    }

    // 2. Registrar usuario (usa el dni que acabas de registrar)
    const userResponse = await fetch('https://thorough-unity-production.up.railway.app/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        email: `${data.username}@example.com`, // puedes personalizar el email
        dni: data.dni,
      }),
    });

    if (!userResponse.ok) {
      throw new Error('Error al registrar usuario');
    }

    const userData = await userResponse.json();

    // Guardar token (si existe)
    const token = userData.token;
    if (token) {
      storeTokenInCookies(token);
    }

    return userData;

  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};
