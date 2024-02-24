import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Profile from './Profile';

export default function Header() {
  const [isOPen, setIsOpen] = useState(false);
  const { user, isLoggedIn } = useAuthContext();

  const styleClass = clsx(
    `lg:hidden w-full h-full md:h-3/6 top-0 bg-slate-700 rounded z-20  my-2 duration-300 ease-in-out ${isOPen ? 'absolute translate-x-0' : ' absolute translate-x-[100vw]'}`,
  );

  function handleOpenDrawer() {
    setIsOpen(true);
  }
  function handleCloseDrawer() {
    setIsOpen(false);
  }

  return (
    <>
      <header className="text-gray-400 bg-gray-800 body-font ">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center max-md:items-start ">
          <Link
            className="flex title-font font-medium items-center max-md:mx-auto text-white mb-4 md:mb-0"
            to="/"
          >
            <img
              src="/logo.png"
              className="h-16 w-16 bg-contain rounded invert"
            />
            <span className="ml-3 text-base">
              <div className="m-0 p-0">Versa</div>
              <div className="m-0 p-0">Mekup</div>
              <div className="m-0 p-0">Studio</div>
            </span>
          </Link>
          <div
            className="sm:block lg:hidden w-20 absolute top-10 right-1"
            onClick={handleOpenDrawer}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <nav className="md:ml-auto md:mr-auto lg:flex flex-wrap max-lg:hidden items-center text-base justify-center">
            <Link
              className="mr-5 cursor-pointer text-xl hover:text-white "
              to="/"
            >
              Home
            </Link>
            <a
              className="mr-5 cursor-pointer text-xl hover:text-white "
              href="#services"
            >
              Services
            </a>
            <a
              className="mr-5 cursor-pointer text-xl hover:text-white "
              href="#testimonials"
            >
              Testimonial
            </a>
            <a
              className="mr-5 cursor-pointer text-xl hover:text-white "
              href="#contactUs"
            >
              Contact Us
            </a>
            <Link
              className="mr-5 cursor-pointer text-xl hover:text-white "
              to={'gallery'}
            >
              Gallery
            </Link>
          </nav>
          <nav className={styleClass} onClick={handleCloseDrawer}>
            <div
              className="sm:block lg:hidden w-20 absolute top-5 left-3/4"
              onClick={handleCloseDrawer}
            >
              <div className="font-bold text-2xl">X</div>
            </div>
            <Link
              className="mr-5 block cursor-pointer text-xl mx-6 my-10 hover:text-white "
              to="/"
            >
              Home
            </Link>
            <a
              className="mr-5 block cursor-pointer text-xl mx-6 my-10 hover:text-white "
              href="#services"
            >
              Services
            </a>
            <a
              className="mr-5 block cursor-pointer text-xl mx-6 my-10 hover:text-white "
              href="#testimonials"
            >
              Testimonial
            </a>
            <a
              className="mr-5 block cursor-pointer text-xl mx-6 my-10 hover:text-white "
              href="#contactUs"
            >
              Contact Us
            </a>
            <Link
              className="mr-5 block cursor-pointer text-xl mx-6 my-10 hover:text-white "
              to={'gallery'}
            >
              Gallery
            </Link>
            {!isLoggedIn && (
              <div>
                <Link to={'/signup'}>
                  <button className="inline-flex mx-4 items-center  py-2 px-3 text-xl hover:bg-gray-700 rounded  mt-4 md:mt-0">
                    Sign Up
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 15 15"
                      fill="none"
                      className="mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.4986 0C6.3257 0 5.36107 0.38943 4.73753 1.19361C4.23745 1.83856 4 2.68242 4 3.63325H5C5 2.84313 5.19691 2.23312 5.5278 1.80636C5.91615 1.30552 6.55152 1 7.4986 1C8.35683 1 8.96336 1.26502 9.35846 1.68623C9.75793 2.11211 10 2.76044 10 3.63601V6H3C2.44772 6 2 6.44772 2 7V13C2 13.5523 2.44772 14 3 14H12C12.5523 14 13 13.5523 13 13V7C13 6.44771 12.5523 6 12 6H11V3.63601C11 2.58135 10.7065 1.66167 10.0878 1.0021C9.46477 0.337871 8.57061 0 7.4986 0ZM3 7H12V13H3V7Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </Link>
                <Link to={'/login'}>
                  <button className="inline-flex items-center text-xl text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded  mt-4 md:mt-0">
                    Login
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </Link>
              </div>
            )}
          </nav>

          {isLoggedIn ? (
            <Profile />
          ) : (
            <div className="lg:flex flex-wrap max-lg:hidden ">
              <Link to={'/signup'}>
                <button className="inline-flex mx-4 items-center  py-2 px-3 text-xl hover:bg-gray-700 rounded  mt-4 md:mt-0">
                  Sign Up
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 15 15"
                    fill="none"
                    className="mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.4986 0C6.3257 0 5.36107 0.38943 4.73753 1.19361C4.23745 1.83856 4 2.68242 4 3.63325H5C5 2.84313 5.19691 2.23312 5.5278 1.80636C5.91615 1.30552 6.55152 1 7.4986 1C8.35683 1 8.96336 1.26502 9.35846 1.68623C9.75793 2.11211 10 2.76044 10 3.63601V6H3C2.44772 6 2 6.44772 2 7V13C2 13.5523 2.44772 14 3 14H12C12.5523 14 13 13.5523 13 13V7C13 6.44771 12.5523 6 12 6H11V3.63601C11 2.58135 10.7065 1.66167 10.0878 1.0021C9.46477 0.337871 8.57061 0 7.4986 0ZM3 7H12V13H3V7Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </Link>
              <Link to={'/login'}>
                <button className="inline-flex items-center text-xl text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded  mt-4 md:mt-0">
                  Login
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
