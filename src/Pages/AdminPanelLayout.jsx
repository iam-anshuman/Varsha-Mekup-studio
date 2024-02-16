import React from 'react';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import { useAdminLogout } from '../hooks/useAdminLogout';
import { Link , Outlet} from 'react-router-dom';

export default function AdminPanelLayout() {
    const {state} = useAdminAuthHook();
    const {logout} = useAdminLogout();

    const handleLogout = () => {
        logout();
        window.location.reload();
    }

  return (
    <>

        <div className="flex">

        <div className='h-[80rem] basis-1/4 bg-slate-700  divide-y-2 divide-slate-400'>
            {/* Admin Navbar */}
            <div className="brand my-6">
                <Link className="flex title-font font-medium items-center max-md:mx-auto text-white mb-4 md:mb-0  " to='/admins-panel'>
                  <span className="ml-3 text-base">
                    <div className='m-0 p-0'>Versa</div>
                    <div className='m-0 p-0'>Mekup</div>
                    <div className='m-0 p-0'>Studio</div>
                  </span>
                <div className='mx-auto text-4xl font-mono mt-8'>Admin Panel</div>
                </Link>
            </div>
            <div className='p-2 hover:bg-slate-800 cursor-pointer'>
                <Link to={"/admins-panel"} className="text-white text-2xl">Dashboard</Link>
            </div>
            <div className='p-2 hover:bg-slate-800 cursor-pointer'>
                <Link to={"/admins-panel/services"} className="text-white text-2xl ">Users</Link>
            </div>
            <div className='p-2 hover:bg-slate-800 cursor-pointer'>
                <Link to={"/admins-panel/issue-certificate"} className="text-white text-2xl ">Issue Certificates</Link>
            </div>
            <div className='p-2 hover:bg-slate-800 cursor-pointer'>
                <Link to={"/admins-panel/user-contact"} className="text-white text-2xl ">User Contact</Link>
            </div>
            <div className='p-2 hover:bg-slate-800 cursor-pointer'>
                <Link to={"/admins-panel/user-service"} className="text-white text-2xl ">User Service</Link>
            </div>
            {
                state.adminToken
                ?           
                <div className='p-2 hover:bg-slate-800 cursor-pointer' onClick={handleLogout}>
                <Link  className="text-white text-2xl ">Log Out</Link>
                </div>
                :
                <div className='p-2 hover:bg-slate-800 cursor-pointer'>
                <Link to={"/admins-panel/login"} className="text-white text-2xl ">Login</Link>
                </div>
            }


        </div>


        <Outlet/>
        </div>
    </>
  )
}
