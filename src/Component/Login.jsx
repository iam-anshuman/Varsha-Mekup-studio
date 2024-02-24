import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { OpenEyeIcon, ClosedEyeIcon } from './Icons';

export default function Login() {
  const { login, error, isLoading } = useLogin();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isHidePassword, setIsHidePassword] = useState(true);

  const handleLoginUser = async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await login(email, password);
    response && navigate('/');
    error && alert(error);
    e.target.email.value = '';
    e.target.password.value = '';
  };

  const handlePasswordHide = () => {
    setIsHidePassword(!isHidePassword);
    if (isHidePassword) {
      document.getElementById('password').setAttribute('type', 'text');
    } else {
      document.getElementById('password').setAttribute('type', 'password');
    }
  };

  return (
    <>
      {user ? (
        <Navigate to={'/'} />
      ) : (
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
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
                          <div
                            className="inline-block cursor-pointer absolute top-4 right-0"
                            onClick={handlePasswordHide}
                          >
                            {isHidePassword ? (
                              <ClosedEyeIcon />
                            ) : (
                              <OpenEyeIcon></OpenEyeIcon>
                            )}
                          </div>
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
                        <Link
                          className="text-white cursor-pointer hover:text-slate-300 my-2"
                          to={'/forget-password'}
                        >
                          <button>Forget Password?</button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
