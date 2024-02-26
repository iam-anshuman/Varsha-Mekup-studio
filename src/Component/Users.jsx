import React, { useEffect, useState } from 'react';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import { Navigate } from 'react-router-dom';
import Toaster from './Toaster';

export default function Users() {
  const { state } = useAdminAuthHook();
  const [index, setIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [toasterMessage, setToasterMessage] = useState('');

  useEffect(() => {
    async function fetchUsers(index) {
      const response = await fetch(
        `https://api.varshamekup.in/admin/api/getUsers?page=${index}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${state.adminToken}`,
          },
        },
      );
      const data = await response.json();
      if (response.status === 404) {
        setToasterMessage('No more users');
        setIndex(0);
      }
      setUsers(data);
    }
    fetchUsers(index);
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
        <div className="h-[80rem] basis-3/4 bg-slate-700 ml-2 py-4 overflow-x-scroll">
          {toasterMessage && (
            <Toaster
              toasterMessage={toasterMessage}
              setToasterMessage={setToasterMessage}
              type={'danger'}
            />
          )}
          <div className="text-white text-6xl text-center underline underline-offset-2">
            USERS
          </div>
          <div className="w-5/6 my-10 text-white bg-slate-600 rounded-lg shadow-lg shadow-black p-6 mx-auto">
            <div className="border-2 border-white">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Full Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone Number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.users &&
                      users.users.map(user => {
                        return (
                          <tr
                            key={user._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {user.firstName + ' ' + user.lastName}
                            </th>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.phone}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="flex justify-center">
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
          </div>
        </div>
      ) : (
        <Navigate to="/admins-panel/login" />
      )}
    </>
  );
}
