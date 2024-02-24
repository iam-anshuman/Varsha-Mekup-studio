import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLogout } from '../hooks/useLogout';
import { DownloadIcon } from '../Component/Icons';

// Set up pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function MyProfile() {
  const { user } = useAuthContext();
  const [studentInformation, setStudentInformation] = useState([]);
  const [certificateDetails, setCertificateDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfBuffers, setPdfBuffers] = useState([]);
  const { logout } = useLogout();

  useEffect(() => {
    if (!user) {
      alert('You are not logged in, please login to continue.');
    }

    async function fetchData() {
      setLoading(true);
      const userToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/getDetails/user', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setStudentInformation(data.studentInformation);
        setCertificateDetails(data.studentInformation.certificateDetails);
        setPdfBuffers(data.pdfBuffer);
      } else {
        setLoading(false);
        alert(data.message);
      }
    }

    fetchData();
  }, [user]);

  const handleDownload = pdfBuffer => {
    const linkSource = `data:application/pdf;base64,${pdfBuffer}`;
    const downloadLink = document.createElement('a');
    const fileName = 'certificate.pdf';
    
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };


  return (
    <>
      {loading
        ? loading
        : user &&
          studentInformation && (
            <div className="bg-slate-400 h-full text-white">
              <div className="flex max-md:flex-col">
                <div className="w-1/4 h-full my-4 mr-4 basis-1/4">
                  <div className="border-slate-700 border-b-2 p-3 bg-slate-600 text-white rounded-tr-md hover:bg-slate-800 cursor-pointer">
                    Profile
                  </div>
                  {/* <div className='border-slate-700 border-b-2 p-3 bg-slate-600 text-white hover:bg-slate-800 cursor-pointer'>Edit Profile</div> */}
                  <div
                    className="border-slate-700 border-b-2 p-3 bg-slate-600 text-white rounded-br-md hover:bg-slate-800 cursor-pointer"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </div>
                </div>
                <div className=" rounded-l-lg sm:w-8  lg:w-full my-4 basis-3/4 bg-slate-700">
                  <div className="flex">
                    <div className="w-1/3 border-b-2 border-white px-10 py-4 my-2 basis-1/3">
                      {/* Avatar section */}
                      <div className="m-2 lg:w-full">
                        <p className="text-center h-10 w-10 text-base lg:h-48 lg:w-48 lg:text-6xl rounded-full ring-offset-1 ring-1 ring-white bg-slate-700 p-2 lg:p-12 my-2 cursor-pointer">
                          {studentInformation.email &&
                            studentInformation.email.charAt(0).toUpperCase()}
                        </p>
                        <div className="w-24 text-sm break-words lg:w-full lg:text-xl lg:font-bold">
                          {studentInformation.email}
                        </div>
                      </div>
                    </div>
                    {/* Profile Detail */}
                    <div className="border-l-2 border-b-2 rounded-bl-lg border-white mx-4 basis-3/4">
                      <div className="text-xl lg:text-4xl m-4">Name</div>
                      <div className="text-md lg:text-2xl  m-4">
                        {studentInformation.firstName +
                          ' ' +
                          studentInformation.lastName}
                      </div>
                      <div className="text-xl lg:text-4xl m-4">Phone</div>
                      <div className="text-md lg:text-2xl  m-4">
                        {studentInformation.phone}
                      </div>
                      <div className="text-md lg:text-4xl m-4">
                        No. Of Certificates Issued
                      </div>
                      <div className="text-xl lg:text-2xl  m-4">
                        {certificateDetails.length}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mx-2">
                    {certificateDetails.map((certificate, index) => {
                      return (
                        <div
                          key={index}
                          className="border-b-2 border-white p-2 my-2"
                        >
                          <div className="text-xl font-bold">
                            {certificate.course_name}
                          </div>
                          <div className="text-base">
                            {certificate.course_duration}
                          </div>
                        </div>
                      );
                    })}

                    <div className="h-[38rem] overflow-y-scroll">
                      {pdfBuffers.length > 0 ? (
                        pdfBuffers.map((pdfBuffer, index) => (
                          <div key={index} className="my-2">
                            <div
                              className="cursor-pointer inline-block"
                              onClick={() => {
                                handleDownload(pdfBuffer);
                              }}
                            >
                              <DownloadIcon />
                            </div>
                            <Document
                              file={{data:`application/pdf;base64,${atob(pdfBuffer)}`}} // Provide an object with the PDF data
                              onLoadSuccess={() => console.log('PDF loaded')}
                              onAbort={() => console.log('PDF aborted')}
                              className={'w-1/2 h-1/2 mx-auto'}
                            >
                              <Page
                                pageNumber={1}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                              />
                            </Document>
                          </div>
                        ))
                      ) : (
                        <div>There is no certificate to show</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
    </>
  );
}
