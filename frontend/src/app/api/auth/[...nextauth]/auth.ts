export async function signIn({ email, password }: any) {
    const response = await fetch(`${process.env.BACKEND_API_DOMAIN}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Login falhou');
    }
  
    const data = await response.json();
    return data;
  }