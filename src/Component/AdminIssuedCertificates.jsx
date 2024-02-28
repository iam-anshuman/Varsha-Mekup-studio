import React, { useEffect, useState } from 'react';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import { Navigate } from 'react-router-dom';
import Toaster from './Toaster';
import { DeleteIcon, DownloadIcon } from './Icons';
import { useCertificateContext } from '../Context/CertificateContext';
import throttle from 'lodash.throttle';

export default function AdminIssuedCertificate() {
  const { state } = useAdminAuthHook();
  const { certificates, index, certificateDispatch } = useCertificateContext();
  const [toasterMessage, setToasterMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);


  const updateProgess = throttle((value)=>{
    setPercentage(value);
  },200,{leading:true,trailing:true})

  useEffect(() => {
    async function fetchCertificares(index) {
      const response = await fetch(
        `https://api.varshamekup.in/admin/api/getCertificateDetails?page=${index}`,
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
        certificateDispatch('FIRST_PAGE');
      }
      certificateDispatch({ type: 'FETCH_CERTIFICATES', payload: data });
    }
    fetchCertificares(index);
  }, [index]);

  const nextPage = () => {
    certificateDispatch({ type: 'NEXT_PAGE' });
  };
  const prevPage = () => {
    if (index === 0) return;
    certificateDispatch({ type: 'PREV_PAGE' });
  };

  const handleDownload = async id => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.varshamekup.in/admin/api/downloadCertificate/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${state.adminToken}`,
          },
        },
      );
      if(!response?.body) return;

      const contentLength = response.headers.get('Content-Length');
      const totalLength = typeof contentLength === 'string' && parseInt(contentLength);
      // console.log(totalLength);
      const reader = response.body.getReader();
      const chunks = [];
      let receivedLength = 0;

      while(true) {
        const { done, value } = await reader.read();
        if(done) {
          break;
        }
        chunks.push(value);
        receivedLength = receivedLength + value.length;
        if(typeof totalLength === 'number') {
          const step = (parseFloat((receivedLength / totalLength).toFixed(2)) * 100);
          updateProgess(step);
        }
      }

      const blob = new Blob(chunks, { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificate.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
      
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.log('Error while downloading file: ', error);
    }
  };

  const handleDelete = async id => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.varshamekup.in/admin/api/deleteCertificate/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.adminToken}`,
          },
        },
      );

      const data = await response.json();
      certificateDispatch({ payload: id, type: 'DELETE_CERTIFICATE' });
      setIsLoading(false);
    } catch (error) {}
    setIsLoading(false);
    console.log(id);
  };

  return (
    <>
      {state.adminToken ? (
        <div className="h-[80rem] basis-5/6  md:basis-3/4 bg-slate-700 ml-2 p-4 overflow-y-scroll">
          {toasterMessage && (
            <Toaster
              toasterMessage={toasterMessage}
              setToasterMessage={setToasterMessage}
              toasterType={'danger'}
            />
          )}
          <div className="border-2 border-white rounded-xl shadow-xl shadow-black my-10">
            <div className="text-3xl text-white font-bold my-2  text-center">
              Issued Certificates
            </div>
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
                    <th scope="col" className="px-6 py-3">
                      Course Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Download/Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.length > 0 ? (
                    certificates.map(certificate => {
                      return (
                        <tr
                          key={certificate._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {certificate.student_name}
                          </td>
                          <td className="px-6 py-4">
                            {certificate.student_email}
                          </td>
                          <td className="px-6 py-4">
                            {certificate.student_phone}
                          </td>
                          <td className="px-6 py-4">
                            {certificate.course_name}
                          </td>
                          <td className="px-6 py-4">
{ isLoading ?
                      <div
                          className="inline-block mx-2"
                        >
                          <DownloadIcon />
                        </div>

:
                          <div
                              className="cursor-pointer inline-block mx-2"
                              onClick={() => {
                                handleDownload(certificate._id);
                              }}
                            >
                              <DownloadIcon />
                            </div>
}
{isLoading ? 
                            <div
                              className="inline-block mx-2"
                            >
                              <DeleteIcon />
                            </div>
                            :
                            <div
                              className="cursor-pointer inline-block mx-2"
                              onClick={() => {
                                handleDelete(certificate._id);
                              }}
                            >
                              <DeleteIcon />
                            </div>
}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        There is No Certificate to show
                      </td>
                    </tr>
                  )}
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
          {percentage > 0 && 
            <div class="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
              <div class="h-6 bg-green-700 rounded-md text-white px-1 dark:bg-green-700" style={{width: `${percentage.toFixed()}%`}}> {percentage.toFixed()}% Complete</div>
            </div>
            }
        </div>
      ) : (
        <Navigate to="/admins-panel/login" />
      )}
    </>
  );
}
