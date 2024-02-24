import React from 'react';

export default function Hero() {
  return (
    <>
      <section className="text-gray-400 bg-gray-800 body-font">
        <div className="container mx-auto flex px-5 py-24 lg:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 flex flex-col lg:items-start lg:text-left mb-16 lg:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              Discover Your Passion:
              <br className="hidden lg:inline-block" />
              Dive into the World of Makeup & Fashion!
            </h1>
            <p className="mb-8 leading-relaxed text-xl">
              Step into a world of endless possibilities at Versa Makeup Studio,
              where beauty meets creativity! Whether you're a budding makeup
              artist, aspiring nail technician, or passionate about traditional
              art forms like mehendi and silai, we have the perfect blend of
              courses and workshops to help you thrive in the glamorous world of
              beauty and fashion.
            </p>
            <div className="flex justify-center">
              <a href="#courses">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  View Courses
                </button>
              </a>
              <a href="#contactUs">
                <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
          <div className="lg:max-w-lg sm:w-3/4 px-5">
            <img
              className="sm:mx-32 object-cover object-center scale-125 brightness-75 contrast-150 "
              alt="hero"
              src="/makeup-girl.png"
            />
          </div>
        </div>
      </section>
    </>
  );
}
