import React, { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isLoggedIn: true };

    case 'LOGOUT':
      return { user: null, isLoggedIn: false };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: localStorage.getItem('token') || null,
    isLoggedIn: localStorage.getItem('token') ? true : false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({ type: 'LOGIN', payload: token });
    }
  }, []);

  console.log('Authenticating user', state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
