import React, { useState } from 'react';
import Toaster from './Toaster';

export default function Contact() {
  const [userContact, setUserContact] = useState({
    name: '',
    phone: '',
    course: '',
    message: '',
  });
  const [toasterMessage, setToasterMessage] = useState('');
  const [toasterType, setToasterType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUserContacted = async () => {
    if (
      userContact.name === '' ||
      userContact.phone === '' ||
      userContact.course === '' ||
      userContact.message === ''
    ) {
      alert('Please fill all the fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('https://43.205.188.10:4000/user/userContacted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userContact),
      });
      const data = await response.json();
      if (response.status === 201) {
        setIsLoading(false);
        setToasterMessage(data.message);
        setToasterType('success');
        setUserContact({
          name: '',
          phone: '',
          course: '',
          message: '',
        });
      } else {
        setIsLoading(false);
        setUserContact({
          name: '',
          phone: '',
          course: '',
          message: '',
        });
        setToasterMessage(data.message);
        setToasterType('danger');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }

  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserContact({
      ...userContact,
      [name]: value,
    });
  };

  const handleCourseChange = event => {
    setUserContact({
      ...userContact,
      course: event.target.value,
    });
  };

  return (
    <>
      <section
        id="contactUs"
        className="text-gray-400 bg-gray-900 body-font relative"
      >
        {toasterMessage && (
          <Toaster
            toasterMessage={toasterMessage}
            toasterType={toasterType}
            setToasterMessage={setToasterMessage}
          />
        )}
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              title="map"
              className="absolute inset-0 grayscale contrast-125 opacity-15"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d220.03277734831778!2d78.75329704260685!3d28.069541754412025!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39752fc0c9e4d4f3%3A0xb90c04aa82b9980c!2sVarsha%20makeup%20studio%20sahaswan!5e0!3m2!1sen!2sin!4v1708764004068!5m2!1sen!2sin"
            ></iframe>
            <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1">State Bank Road Sahasban</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                  EMAIL
                </h2>
                <a className="text-indigo-400 leading-relaxed">
                  ranivarsha724@gmail.com
                </a>
                <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p className="leading-relaxed">+91 9149150282</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-white text-lg mb-1 font-medium title-font">
              Learn with us
            </h2>
            <p className="leading-relaxed mb-5">
              Let's learn new skills with us and grow in your life
            </p>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={handleInputChange}
                value={userContact.name}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-400"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={handleInputChange}
                value={userContact.phone}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="course"
                className="leading-7 text-sm text-gray-400"
              >
                Select Course
              </label>
              <select
                name="course"
                id="course"
                className="w-full  bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={userContact.course}
                onChange={handleCourseChange}
              >
                <option value="">--Please choose an option--</option>
                <option value={'Beautician Course - 6 Months'}>
                  Beautician Course - 6 Months
                </option>
                <option value={'Mehendi Course - 3 Months'}>
                  Mehendi Course - 3 Months
                </option>
                <option value={'Makeup course - 3 Months'}>
                  Makeup course - 3 Months
                </option>
                <option value={'Silai Course - 6 Months'}>
                  Silai Course - 6 Months
                </option>
                <option value={'Nail Art Course - Months'}>
                  Nail Art Course - Months
                </option>
              </select>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-400"
              >
                Leave a message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                onChange={handleInputChange}
                value={userContact.message}
              ></textarea>
            </div>
{
isLoading ?
              <button
              className="text-white bg-indigo-300 border-0 py-2 px-6 focus:outline-none rounded text-lg"
              disabled
              >
              Button
              </button>
              :            
            <button
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={handleUserContacted}
            >
              Button
            </button>
}
          </div>
        </div>
      </section>
    </>
  );
}
