import React from 'react';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import { useAdminLogout } from '../hooks/useAdminLogout';
import { Link, Outlet } from 'react-router-dom';

export default function AdminPanelLayout() {
  const { state } = useAdminAuthHook();
  const { logout } = useAdminLogout();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <div className="flex">
        <div className="h-[80rem] basis-1/6 md:basis-1/4 bg-slate-700  pr-5 divide-y-2 divide-slate-400">
          {/* Admin Navbar */}
          <div className="brand my-6">
            <Link
              className="lg:flex title-font font-medium items-center max-md:mx-auto text-white mb-4 md:mb-0  "
              to="/"
            >
              <span className=" ml-3 text-base">
                <div className="mx-2 p-0">Varsha</div>
                <div className="mx-2 p-0">Mekup</div>
                <div className="mx-2 p-0">Studio</div>
              </span>
              <div className="mx-2 text-base md:text-4xl font-mono mt-8">Admin Panel</div>
            </Link>
          </div>
          <div className="p-2 hover:bg-slate-800 cursor-pointer">
            <Link to={'/admins-panel'} className="text-white text-sm md:text-2xl">
              Dashboard
            </Link>
          </div>
          <div className="p-2 hover:bg-slate-800 cursor-pointer">
            <Link to={'/admins-panel/users'} className="text-white text-sm md:text-2xl ">
              Users
            </Link>
          </div>
          <div className="p-2 hover:bg-slate-800 cursor-pointer">
            <Link
              to={'/admins-panel/issue-certificate'}
              className="text-white text-sm md:text-2xl "
            >
              Issue Certificates
            </Link>
          </div>
          <div className="p-2 hover:bg-slate-800 cursor-pointer">
            <Link
              to={'/admins-panel/certificates-issued'}
              className="text-white text-sm md:text-2xl "
            >
              Certificates
            </Link>
          </div>
          <div className="p-2 hover:bg-slate-800 cursor-pointer">
            <Link
              to={'/admins-panel/user-contacted'}
              className="text-white text-sm md:text-2xl"
            >
              User Contacted
            </Link>
          </div>
          <div className="p-2 hover:bg-slate-800 cursor-pointer">
            <Link
              to={'/admins-panel/user-service'}
              className="text-white text-sm md:text-2xl"
            >
              User Service
            </Link>
          </div>
          {state.adminToken ? (
            <div
              className="p-2 hover:bg-slate-800 cursor-pointer"
              onClick={handleLogout}
            >
              <Link className="text-white text-sm md:text-2xl">Log Out</Link>
            </div>
          ) : (
            <div className="p-2 hover:bg-slate-800 cursor-pointer">
              <Link to={'/admins-panel/login'} className="text-white text-sm md:text-2xl">
                Login
              </Link>
            </div>
          )}
        </div>

        <Outlet />
      </div>
    </>
  );
}
