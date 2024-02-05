import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import { FaGraduationCap, FaBook } from "react-icons/fa6";
import { TbCertificate } from "react-icons/tb";

export default function Statistics() {
  return (
    <>
<section className="text-gray-400 bg-gray-900 body-font">
  <div className="container mx-auto">
  <div className="text-3xl sm:text-4xl mb-2 text-white">Our Achievements:</div>
  <div className='bg-indigo-500 rounded w-1/12 h-1'></div>
  </div>
  <div className="container px-5 py-5 mx-auto">
    <div className="flex flex-wrap -m-4 text-center">
      <div className="p-4 sm:w-1/4 w-1/2">
        
        <h2 className="title-font font-medium sm:text-4xl text-3xl text-white"><FaUserAlt className='inline w-7 mb-2 mx-2'/>2.7K</h2>
        <p className="leading-relaxed">Total Customer</p>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl text-white"> <FaGraduationCap className='inline w-8 my-2 mx-2' />1.8K</h2>
        <p className="leading-relaxed">Students</p>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl text-white"><TbCertificate className='inline w-8 mb-3' /> 35</h2>
        <p className="leading-relaxed">Certification</p>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl text-white"><FaBook className='inline w-8 mb-2'/> 5</h2>
        <p className="leading-relaxed">Courses</p>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
