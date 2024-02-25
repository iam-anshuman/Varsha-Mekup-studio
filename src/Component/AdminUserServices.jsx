import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import Toaster from './Toaster';

export default function AdminUserServices() {
  const { state } = useAdminAuthHook();
  const [userServices, setUserServices] = useState([]);
  const [index, setIndex] = useState(0);
  const [toasterMessage, setToasterMessage] = useState('');

  useEffect(() => {
    async function fetchUserServices(index) {
      const response = await fetch(
        `https://43.205.188.10:4000/admin/api/getUserServices?page=${index}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${state.adminToken}`,
          },
        },
      );
      const data = await response.json();
      if (response.status === 404) {
        setToasterMessage('No more messages');
        setIndex(0);
      }
      setUserServices(data.userServices);
    }
    fetchUserServices(index);
  }, [index]);

  const nextPage = () => {
    setIndex(index + 1);
  };

  const prevPage = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };

  return (
    <>
      {state.adminToken ? (
        <div className="h-[80rem] basis-3/4 bg-slate-700 ml-2 p-4 overflow-y-scroll">
          {toasterMessage && (
            <Toaster
              toasterMessage={toasterMessage}
              setToasterMessage={setToasterMessage}
              toasterType={'danger'}
            />
          )}
          <div className="border-2 border-white rounded-xl shadow-xl shadow-black ">
            <div className="text-3xl text-white font-bold my-2  text-center">
              User Booked Services
            </div>

            <div className="flex flex-wrap justify-around my-10 ">
              {userServices &&
                userServices.map((userService, index) => {
                  return (
                    <div
                      key={userService._id}
                      className="block max-w-sm p-6 my-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      <div className="mb-2 text-center  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Booked Service
                      </div>
                      <div className="mb-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Name :{' '}
                        <span className="text-white mx-2 text-base">
                          {userService.name}
                        </span>
                      </div>
                      <div className="mb-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Phone :{' '}
                        <span className="text-white mx-2 text-base">
                          {userService.phone}
                        </span>
                      </div>
                      <div className="mb-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Service Selected :{' '}
                        <span className="text-white mx-2 text-base">
                          {userService.service}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-center my-5">
              {index === 0 ? (
                <button
                  className=" flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg  dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400"
                  disabled
                  onClick={() => {
                    prevPage();
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Previous
                </button>
              ) : (
                <button
                  className=" flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => {
                    prevPage();
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Previous
                </button>
              )}
              <button
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => {
                  nextPage();
                }}
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/admins-panel/login" />
      )}
    </>
  );
}
