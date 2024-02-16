import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function MyProfile() {
  const {user} = useAuthContext();
  const [studentInformation, setStudentInformation] = useState([]);
  const [certificateDetails, setCertificateDetails] = useState([]);
  const [pdfBuffers, setPdfBuffers] = useState([]);

  useEffect(() => {
    console.log("User State".user);
    if(!user){
      alert("You are not logged in, please login to continue.");
    }
    async function fetchData(){
    const response = await fetch('http://localhost:4000/getDetails/user',{
      method:"GET",
      headers:{
        'Authorization': 'Bearer '+user,
      }
    })
    const data = await response.json();
    if(response.ok){
      setStudentInformation(data.studentInformation);
      setCertificateDetails(data.studentInformation.certificateDetails);
      setPdfBuffers(data.pdfBuffer)
      console.log(data);
    }
    else{
      alert(data.message);
    }
  }
  fetchData();
  },[user])
  
  return (
    <>
    {studentInformation ? 
      <div className='bg-slate-400 h-full text-white'>
      <div className="flex max-md:flex-col">
        <div className='w-1/4 h-full my-4 mr-4 basis-1/4'>
          <div className='border-slate-700 border-b-2 p-3 bg-slate-600 text-white rounded-tr-md hover:bg-slate-800 cursor-pointer'>Profile</div>
          <div className='border-slate-700 border-b-2 p-3 bg-slate-600 text-white hover:bg-slate-800 cursor-pointer'>Certificates</div>
          <div className='border-slate-700 border-b-2 p-3 bg-slate-600 text-white hover:bg-slate-800 cursor-pointer'>Edit Profile</div>
          <div className='border-slate-700 border-b-2 p-3 bg-slate-600 text-white rounded-br-md hover:bg-slate-800 cursor-pointer'>Logout</div>
        </div>
        <div className=' rounded-l-lg   w-full my-4 basis-3/4 bg-slate-700'>
          <div className="flex">
            <div className="w-1/3 border-b-2 border-white px-10 py-4 my-2 basis-1/3">
              {/* Avatar section */}
              <div className='m-2'>
                <p className="text-center h-48 w-48 text-6xl rounded-full ring-offset-1 ring-1 ring-white bg-slate-700 p-12 my-2 cursor-pointer max-sm:absolute max-sm:-top-16 max-sm:left-2 z-0">A</p>
                <div className='text-xl font-bold'>{studentInformation.email}</div>
              </div>
            </div>
            {/* Profile Detail */}
            <div className="w-full h-full border-l-2 border-b-2 rounded-bl-lg border-white mx-4 basis-3/4">
              <div className='text-base mx-2'>Name</div>
              <div className='text-2xl  mx-2'>{studentInformation.firstName+" "+ studentInformation.lastName}</div>
              <div className='text-base mx-2'>Phone</div>
              <div className='text-2xl  mx-2'>{studentInformation.phone}</div>
              <div className='text-base mx-2'>No. Of Certificates Issued</div>
              <div className='text-2xl  mx-2'>{certificateDetails.length}</div>             
            </div>
          </div>
          <div className="flex flex-col mx-2">
            {certificateDetails.map((certificate,index)=>{
              return <div key={index} className='border-b-2 border-white p-2 my-2'>
                <div className='text-xl font-bold'>{certificate.course_name}</div>
                <div className='text-base'>{certificate.course_duration}</div>
              </div>
            })}
          <div className='mt-20'>

            {
              pdfBuffers &&
              pdfBuffers.map((pdfBuffer, index) => (
                <div key={index}>
                    <Document
                        file={{ data: atob(pdfBuffer) }}
                        onLoadSuccess={() => console.log('PDF loaded')}
                    >
                        <Page pageNumber={1} />
                    </Document>
                </div>
            ))

    
            }
            </div>
          </div>
        </div>
      </div>
  </div>
  :
  null  
  }

    </>
  )
}
