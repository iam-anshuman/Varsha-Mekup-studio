import React, { useState } from 'react';
import { useCreateCertificate } from '../hooks/useCreateCertificate';
import { useAdminAuthHook } from '../hooks/useAdminAuthHook';
import { Navigate } from 'react-router-dom';

export default function IssueCertificate() {
  const { createCertificate,loading,error } = useCreateCertificate();
  const [isValidatedImage, setIsValidatedImage] = useState(false);
  const { state } = useAdminAuthHook();

  function ValidateImage(e) {
    const input = e.target;
    const file = input.files[0];
    if (file.type != 'image/jpeg' && file.type != 'image/jpg') {
      alert('Kindly Upload the Image in jpg or jpeg format');
      input.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds the maximum limit of 2MB.');
      input.value = ''; // Clear the input field
      return;
    }
    // Create a new FileReader instance
    const reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function () {
      return function (e) {
        const image = new Image();
        image.src = e.target.result;

        // Validate image dimensions
        image.onload = function () {
          if (image.width != 2800 || image.height != 2800) {
            alert('Image dimensions must be 2800x2800 pixels.');
            input.value = ''; // Clear the input field
          } else {
            setIsValidatedImage(true);
            console.log('Image is Validated');
          }
        };
      };
    })(file);

    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
  }

  const handleGenerateCertificate = async e => {
    e.preventDefault();
    const student_email = e.target.student_email.value;
    const student_phone = e.target.student_phone.value;
    const student_name = e.target.student_name.value;
    const course_name = e.target.course_name.value;
    const course_starting = e.target.course_starting.value;
    const course_ending = e.target.course_ending.value;
    const course_in_days = e.target.course_in_days.value;
    const course_duration = `${course_starting} to ${course_ending}`;
    const completion_year = e.target.completion_year.value;
    const imageAvatar = e.target.upload_image.files[0];

    if (
      !student_email ||
      !student_phone ||
      !student_name ||
      !course_name ||
      !course_starting ||
      !course_ending ||
      !imageAvatar ||
      !course_in_days ||
      !completion_year
    ) {
      alert('Kindly Fill all the fields');
      return;
    }
    if (!isValidatedImage) {
      alert('Kindly Upload the Image in png or jpeg format');
      return;
    }

    const formData = new FormData();
    formData.append('imageAvatar', imageAvatar);
    formData.append(
      'student_detail',
      JSON.stringify({
        student_email,
        student_phone,
        student_name,
        course_name,
        course_duration,
        course_in_days,
        completion_year,
      }),
    );

    const response = await createCertificate(formData);

    if (response.success) {
      alert('Certificate is Successfully Created');
      e.target.student_email.value = '';
      e.target.student_phone.value = '';
      e.target.student_name.value = '';
      e.target.course_name.value = '';
      e.target.course_starting.value = '';
      e.target.course_ending.value = '';
      e.target.upload_image.value = '';
      e.target.course_in_days.value = '';
      e.target.completion_year.value = '';
    } else {
      alert('Error in Creating Certificate');
      e.target.student_email.value = '';
      e.target.student_phone.value = '';
      e.target.student_name.value = '';
      e.target.course_name.value = '';
      e.target.course_starting.value = '';
      e.target.course_ending.value = '';
      e.target.upload_image.value = '';
      e.target.course_in_days.value = '';
      e.target.completion_year.value = '';
    }
  };
  return (
    <>
      {state.adminToken ? (
        <div className="h-[80rem] basis-5/6 md:basis-3/4 bg-slate-700 ml-2  py-4  ">
          <div className="underline decoration-wavy decoration-slate-400 font-serif text-white text-center text-4xl">
            Issue a Certificate to the Student
          </div>
          <div className="relative my-4 bg-slate-700 ">
            <div className="mx-auto my-10 md:w-1/2">
              <div className="divide-y bg-gray-600 divide-gray-200 shadow-lg shadow-black rounded-lg p-8">
                <form onSubmit={handleGenerateCertificate}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="text-white text-2xl">
                      Generate certificate
                    </div>
                    <p className="text-sm text-slate-300">
                      To generate certificate for student enter the following
                      detaile
                    </p>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="student_email"
                        name="student_email"
                        type="email"
                        className="peer placeholder-transparent h-10 w-full border-b-2 bg-slate-700 border-indigo-500 text-gray-200 focus:outline-none focus:borer-rose-600"
                        placeholder="Student Name"
                      />
                      <label
                        htmlFor="student_email"
                        className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
                      >
                        Student Email
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="student_phone"
                        name="student_phone"
                        type="number"
                        className="peer placeholder-transparent h-10 w-full border-b-2 bg-slate-700 border-indigo-500 text-gray-200 focus:outline-none focus:borer-rose-600"
                        placeholder="Student Phone"
                      />
                      <label
                        htmlFor="student_phone"
                        className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
                      >
                        Student Phone
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="student_name"
                        name="student_name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 bg-slate-700 border-indigo-500 text-gray-200 focus:outline-none focus:borer-rose-600"
                        placeholder="Student Name"
                      />
                      <label
                        htmlFor="student_name"
                        className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
                      >
                        Student Name
                      </label>
                    </div>
                    <div className="relative mb-4">
                      <label
                        htmlFor="course_name"
                        className="leading-7 text-sm text-gray-400"
                      >
                        Select Course
                      </label>
                      <select
                        name="course_name"
                        id="course_name"
                        className="w-full  bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      >
                        <option>Beautician Course </option>
                        <option>Mehendi Course </option>
                        <option>Makeup course </option>
                        <option>Silai Course </option>
                        <option>Nail Art Course </option>
                      </select>
                    </div>
                    <div className="relative mb-2">
                      <label
                        htmlFor="course_in_days"
                        className="leading-7 text-sm  md:text-lg text-gray-200"
                      >
                        Number of Days in Course
                      </label>
                      <select
                        name="course_in_days"
                        id="Course_in_days"
                        className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      >
                        <option>30 Days</option>
                        <option>60 Days</option>
                        <option>90 Days</option>
                        <option>120 Days</option>
                        <option>150 Days</option>
                        <option>180 Days</option>
                        <option>210 Days</option>
                        <option>240 Days</option>
                        <option>270 Days</option>
                        <option>300 Days</option>
                        <option>330 Days</option>
                        <option>360 Days</option>
                      </select>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="completion_year"
                        name="completion_year"
                        type="number"
                        className="peer placeholder-transparent h-10 w-full border-b-2 bg-slate-700 border-indigo-500 text-gray-200 focus:outline-none focus:borer-rose-600"
                        placeholder="Completion Year"
                      />
                      <label
                        htmlFor="completion_year"
                        className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm"
                      >
                        Year of Course Completion
                      </label>
                    </div>
                    <div className="relative mb-2">
                      <label
                        htmlFor="course_starting"
                        className="leading-7 text-sm md:text-lg text-gray-200"
                      >
                        Select Course Starting Month
                      </label>
                      <select
                        name="course_starting"
                        id="Course_starting"
                        className="w-full  bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      >
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                    </div>
                    <div className="relative mb-2">
                      <label
                        htmlFor="course_ending"
                        className="leading-7 text-sm  md:text-lg text-gray-200"
                      >
                        Select Course Ending Month
                      </label>
                      <select
                        name="course_ending"
                        id="Course_ending"
                        className="w-full  bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      >
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </select>
                    </div>
                    <div className="relative mb-2">
                      <label
                        htmlFor="upload_image"
                        className="leading-7 text-sm  md:text-lg text-gray-200"
                      >
                        Upload Image
                      </label>
                      <p className="text-sm opacity-30 text-slate-200">
                        Image should be less than 2MB, image should be 2800px X
                        2800px and Image should be in Jpg or jpeg format
                      </p>
                      <input
                        type="file"
                        id="upload_image"
                        name="upload_image"
                        accept="image/*"
                        onChange={ValidateImage}
                        className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
{ loading ?
                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-indigo-400  text-white rounded-md px-2 py-1"
                        disabled
                      >
                        Create Certificate
                      </button>
                    </div>
                    :
                    <div className="relative">
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-2 py-1"
                    >
                      Create Certificate
                    </button>
                  </div>
}
                  </div>
                </form>
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
