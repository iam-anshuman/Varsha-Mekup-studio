import React from 'react';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import { useAdminLogin } from '../hooks/useAdminLogin';
import { Navigate } from 'react-router-dom';

export default function AdminLogin() {
  const { login, error, loading } = useAdminLogin();

  const { state, dispatch } = useAdminAuthHook();

  const handleLoginUser = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await login(email, password);
    response && console.log(response);
    error && alert(error);
    e.target.email.value = '';
    e.target.password.value = '';
  };

  return (
    <>
      {state.adminToken && <Navigate to="/admins-panel" />}
      <div className="h-[80rem] basis-3/4 bg-slate-700 ml-2  py-4  ">
        <section className="text-gray-400 body-font">
          <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="relative px-4 py-10 bg-slate-700 shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div>
                    <h1 className="text-2xl font-semibold text-white">Login</h1>
                    <p>Enter credentials to login</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <form onSubmit={handleLoginUser}>
                      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <div className="relative">
                          <input
                            autoComplete="off"
                            id="email"
                            name="email"
                            type="text"
                            className="peer placeholder-transparent h-10 w-full border-b-2 bg-slate-700 border-slate-800 text-gray-200 focus:outline-none focus:borer-rose-600"
                            placeholder="Email address"
                          />
                          <label
                            htmlFor="email"
                            className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
                          >
                            Email Address
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            autoComplete="off"
                            id="password"
                            name="password"
                            type="password"
                            className="peer placeholder-transparent h-10 w-full bg-slate-700 border-b-2 border-gray-800 text-gray-200 focus:outline-none focus:borer-rose-600"
                            placeholder="Password"
                          />
                          <label
                            htmlFor="password"
                            className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
                          >
                            Password
                          </label>
                        </div>
                        <div className="relative">
                          <button
                            type="submit"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-2 py-1"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
