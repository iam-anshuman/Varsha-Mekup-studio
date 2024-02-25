import { useState } from "react";

export function useCreateCertificate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function createCertificate(formData) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      throw new Error('Unauthorized');
    }
    const bearer = 'Bearer ' + token;
    try {

      setLoading(true);
      const response = await fetch(
        'https://43.205.188.10:4000/admin/api/createpdf',
        {
          method: 'POST',
          headers: {
            Authorization: bearer,
          },
          body: formData,
        },
      );
      const res = await response.json();
      if (response.ok) {
        setLoading(false);
        return res;
      } else {
        setLoading(false);
        setError(res.message);
        throw new Error(res.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      throw new Error(error);
    }
  }
  return { createCertificate,loading,error };
}
