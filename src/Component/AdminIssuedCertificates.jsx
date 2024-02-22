import React,{useEffect, useState,} from 'react';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import { Navigate} from 'react-router-dom';
import Toaster from './Toaster';
import { DeleteIcon, DownloadIcon } from './Icons';
import download from 'downloadjs';
import { useCertificateContext } from '../Context/CertificateContext';

export default function AdminIssuedCertificate() {
    const {state} = useAdminAuthHook();
    const {certificates, index , certificateDispatch} = useCertificateContext();
    const [toasterMessage,setToasterMessage] = useState('');

    useEffect(()=>{
        async function fetchCertificares(index){
            const response = await fetch(`http://localhost:4000/admin/api/getCertificateDetails?page=${index}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${state.adminToken}`
                }
            });
            const data = await response.json();
            if(response.status === 404){
                setToasterMessage("No more users");
                certificateDispatch("FIRST_PAGE")
            }
            certificateDispatch({type:"FETCH_CERTIFICATES",payload:data});
        }
        fetchCertificares(index);
    },[index]);
    
    const nextPage = () => {
        certificateDispatch({type:"NEXT_PAGE"})
    }
    const prevPage = () => {
        if(index === 0) return;
        certificateDispatch({type:"PREV_PAGE"})
    }


    const handleDownload = async (id) => {
        try {

            const response = await fetch(`http://localhost:4000/admin/api/downloadCertificate/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${state.adminToken}`,
                    "Response-Type":"blob"
                }
            });
            const blob = await response.blob();
            download(blob,`Certificate.pdf`)


        } catch (error) {

            console.log("Error while downloading file: ",error);

        }

    }

    const handleDelete = async (id) => {

        try {
            const response = await fetch(`http://localhost:4000/admin/api/deleteCertificate/${id}`,{
                method:"DELETE",
                headers:{
                    "Authorization":`Bearer ${state.adminToken}`
                }
            })

            const data = await response.json();
            certificateDispatch({payload:id,type:"DELETE_CERTIFICATE"});

        } catch (error) {
            
        }

        console.log(id);
    }

  return (
    <>
        {state.adminToken ? (
        <div className="h-[80rem] basis-3/4 bg-slate-700 ml-2 p-4 overflow-y-scroll">
          {toasterMessage && <Toaster toasterMessage={toasterMessage} setToasterMessage={setToasterMessage} type={"danger"}/>}
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

{certificates.length > 0 ? certificates.map((certificate) => {
    return(
                    <tr key={certificate._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                            <div className='cursor-pointer inline-block mx-2' onClick={()=>{handleDownload(certificate._id)}}><DownloadIcon/></div><div className='cursor-pointer inline-block mx-2' onClick={()=>{handleDelete(certificate._id)}}><DeleteIcon/></div>
                        </td>
                    </tr>
    )
})
:
<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        There is No Certificate to show
    </td>
    
</tr>
  
}
                </tbody>
            </table>
                    <div className="flex justify-center">
                    {index === 0 ?
                      <button className=" flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg  dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400" disabled onClick={()=>{prevPage()}}>
                      <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                      </svg>
                      Previous
                    </button>
                    :
                    <button className=" flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={()=>{prevPage()}}>
                        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        Previous
                      </button>
                    }
                      <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={()=>{nextPage()}}>
                        Next
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                      </button>
                    </div>
        </div>

          </div>
        </div>
      ) : (
        <Navigate to="/admins-panel/login" />
      )}
    </>
  )
}
