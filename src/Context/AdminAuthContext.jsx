import { createContext, useEffect, useReducer } from 'react';

export const AdminAuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        adminToken: action.payload,
        adminLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        adminToken: '',
        adminLoggedIn: false,
      };
    default:
      return state;
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    adminToken: '',
    adminLoggedIn: false,
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      dispatch({ type: 'LOGIN', payload: adminToken });
    }
  }, []);

  console.log('Admin Auth State:', state);

  return (
    <AdminAuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
