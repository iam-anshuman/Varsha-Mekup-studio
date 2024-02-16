import React, { useEffect } from 'react';

export default function MyProfile() {
    
  return (
    <>

    <div className='bg-slate-400 h-screen'>
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
                  <div className='text-xl font-bold'>anshumant72@gmail.com</div>
                </div>
              </div>
              {/* Profile Detail */}
              <div className="w-full h-full border-l-2 border-b-2 rounded-bl-lg border-white mx-4 basis-3/4">
                <div className='text-base mx-2'>Name</div>
                <div className='text-2xl  mx-2'>Anshuman</div>
                <div className='text-base mx-2'>DOB</div>
                <div className='text-2xl  mx-2'>23-07-2003</div>
                <div className='text-base mx-2'>Gender</div>
                <div className='text-2xl  mx-2'>Male</div>
                <div className='text-base mx-2'>No. Of Certificates Issued</div>
                <div className='text-2xl  mx-2'>2</div>
                <div className='text-base mx-2'>Maritial Status</div>
                <div className='text-2xl  mx-2'>Signle</div>                
              </div>
            </div>
            <div className="flex flex-col mx-2">
              <div>Certificate 1</div>
              <div>Certificate 2</div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
