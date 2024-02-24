import { AdminAuthContext } from '../Context/AdminAuthContext';
import { useContext } from 'react';

export const useAdminAuthHook = () => {
  const Context = useContext(AdminAuthContext);
  if (Context === undefined) {
    throw new Error('useAdminAuthHook must be used within a AuthProvider');
  }
  return Context;
};
