import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function PrivateRoute() {
    const {user, isLoggedIn} = useAuthContext();
    console.log("PrivateRoute",isLoggedIn);
    console.log("PrivateRoute",user);
  return (
    <>
        {
            isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
        }
    </>
  )
}
