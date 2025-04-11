export const getProtectedData = async (token: string) => {
    const response = await fetch('http://localhost:8080/api/protected', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('No autorizado');
    }
  
    const data = await response.json();
    return data;
  };
  