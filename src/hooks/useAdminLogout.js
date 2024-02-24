import { useAdminAuthHook } from './useAdminAuthHook';

export function useAdminLogout() {
  const { dispatch } = useAdminAuthHook();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('adminToken');
  };

  return { logout };
}
