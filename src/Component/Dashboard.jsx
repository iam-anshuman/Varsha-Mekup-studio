import React, { useEffect, useState } from 'react';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import { Link, Navigate } from 'react-router-dom';

export default function Dashboard() {
    const {state,dispatch} = useAdminAuthHook();
    const [dashboard,setDashboard] = useState({});

    useEffect(()=>{
        const token = localStorage.getItem('adminToken');
        async function getDashboard(){
            const response = await fetch('http://localhost:4000/admin/api/dashboard',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                },
        });
        const data = await response.json();
        if(response.status === 401){
            alert("Something Went Wrong");
        }
        else{
            setDashboard(data);
        }
    }
        getDashboard();
    },[]);

  return (
    <>
    {
        state.adminToken ? dashboard &&
        
        <div className='overflow-y-scroll basis-3/4 bg-slate-700 ml-2 p-4'>
            <div className=''>

            <h1 className='text-2xl md:text-5xl text-white text-center mx-auto my-10 underline underline-offset-8 font-extrabold'>Dashboard</h1>
            <div className='flex h-[60rem] md:h-[24rem] max-md:flex-wrap font-extrabold text-3xl  md:text-6xl'>
            <div className='w-full m-6 p-4 text-white rounded-lg shadow-lg shadow-black '>
            <Link to="/admins-panel/users" className='cursor-pointer'>
                <div className=' bg-slate-600 rounded-3xl p-10 '>{dashboard.totalUsers}</div>
                <div className='text-3xl text-center my-2'>Total Users</div>
            </Link>
            </div>

            <div className='w-full m-6 p-4 text-white rounded-lg shadow-lg shadow-black cursor-pointer'>
            <Link to="/admins-panel/user-contacted" className='cursor-pointer'>
                <div className=' bg-slate-600 rounded-3xl p-10 '>{dashboard.totalContacted}</div>
                <div className='text-3xl text-center my-2'>Total User Contacted</div>
            </Link>
            </div>
            <div className='w-full m-6 p-4 text-white rounded-lg shadow-lg shadow-black cursor-pointer'>
            <Link to="/admins-panel/user-service" className='cursor-pointer'>
                <div className=' bg-slate-600 rounded-3xl p-10 '>{dashboard.totalServices}</div>
                <div className='text-3xl text-center my-2'>Total Services Booked</div>
            </Link>
            </div>
            <div className='w-full m-6 p-4 text-white rounded-lg shadow-lg shadow-black cursor-pointer'>
            <Link to="/admins-panel/certificates-issued" className='cursor-pointer'>
                <div className=' bg-slate-600 rounded-3xl p-10 '>{dashboard.totalCertificates}</div>
                <div className='text-3xl text-center my-2'>Total Certificates</div>
            </Link>
            </div>
        </div>
    </div>
</div>
        : 

        <Navigate to="/admins-panel/login"/>
    }
    </>
  )
}
