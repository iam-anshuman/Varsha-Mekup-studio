import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Document, Page, pdfjs } from 'react-pdf';
import { DownloadIcon } from '../Component/Icons';

// Set up pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function MyProfile() {
  const { user } = useAuthContext();
  const [studentInformation, setStudentInformation] = useState([]);
  const [certificateDetails, setCertificateDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfBuffers, setPdfBuffers] = useState([]);

  useEffect(() => {
    if (!user) {
      alert('You are not logged in, please login to continue.');
    }

    async function fetchData() {
      setLoading(true);
      const userToken = localStorage.getItem('token');
      const response = await fetch('https://api.varshamekup.in/getDetails/user', {
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
    window.URL.revokeObjectURL(linkSource);
  };

  console.log(studentInformation)
  return (
    <>
      {loading
        ? loading
        : user &&
          studentInformation && (
          <div className="bg-slate-400 min-[height:calc(100vh - 95px)] text-white">
              <div className="flex max-md:flex-col">
                <div className=" w-full bg-slate-700 block md:flex">
                  <div className="Card m-4 md:basis-1/4">
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center pb-10 my-2">
                            <div className="w-24 h-24 mb-3 rounded-full shadow-black relative shadow-md">
                              <div className='absolute text-4xl left-1/3 top-1/4'>
                                 {studentInformation.email && studentInformation.email.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white my-1">{studentInformation.firstName+" "+studentInformation.lastName}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400 my-1">{studentInformation.email}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 my-1">{studentInformation.phone}</span>
                        </div>
                    </div>
                  </div>
                  <div className="flex flex-col mx-2 md:basis-3/4">
                    <h5 className='text-2xl p-2 font-bold'>Course you have done</h5>
                    {certificateDetails.map((certificate, index) => {
                      return (
                        <div
                        key={index}
                        className="border-b-2 border-white p-2 my-2"
                        >
                          <span className='text-2xl'>{index+1}. </span>
                          <div className="text-xl font-bold inline-block">
                            {certificate.course_name} 
                            <span>
                            &nbsp;-&nbsp;{certificate.course_duration}
                            </span>
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
                              className={'w-20'}
                              witdh={100}
                              scale={0.5}
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
