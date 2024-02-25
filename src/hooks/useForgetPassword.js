import { useState } from 'react';
export function useForgetPassword() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  async function forgetPassword(email) {
    try {
      setLoading(true);
      const response = await fetch(
        'https://43.205.188.10:4000/auth/forget-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        throw new Error(data.message);
      }
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  return { forgetPassword, loading, error, data };
}
