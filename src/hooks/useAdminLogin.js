import { useState } from 'react';
import { useAdminAuthHook } from './useAdminAuthHook';

export function useAdminLogin() {
  const { dispatch } = useAdminAuthHook();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      // login logic
      setLoading(true);
      const response = await fetch('http://localhost:4000/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'LOGIN', payload: data.token });
        localStorage.setItem('adminToken', data.token);
        setLoading(false);
        return data;
      }
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };
  return { login, error, loading };
}
