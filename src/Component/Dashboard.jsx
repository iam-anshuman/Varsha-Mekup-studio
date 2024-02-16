import React from 'react';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const {state,dispatch} = useAdminAuthHook();

  return (
    <>
    {
        state.adminToken ?
        
        <div className='h-[80rem] basis-3/4 bg-slate-700 ml-2  py-4 flex'>
            <div className='w-1/2 basis-1/2 h-1/3 mx-6 p-4 text-white rounded-lg shadow-lg shadow-black '>
                User
            </div>
            <div className='w-1/2 basis-1/2 h-1/3 mx-6 p-4 text-white rounded-lg shadow-lg shadow-black '>
                Contact
            </div>
            <div className='w-1/2 basis-1/2 h-1/3 mx-6 p-4 text-white rounded-lg shadow-lg shadow-black '>
                Services Booked
            </div>
        </div>

        : 

        <Navigate to="/admins-panel/login"/>
    }
    </>
  )
}
