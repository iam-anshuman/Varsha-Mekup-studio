import { useState } from "react";

export default function Modal({ open, setIsOpen }) {
  const [loading,setLoading] = useState(false);

  const handleBookNow = async e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    if (name === '' || phone === '' || service === '') {
      alert('Please fill all the fields');
      return;
    }

    try{
      setLoading(true);
      const response = await fetch('https://43.205.188.10:4000/user/bookNow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, service }),
      });
      const data = await response.json();

      if (response.status === 201) {
        setLoading(false);
        alert(data.message);
        setIsOpen(false);
      } else {
        setLoading(false);
        alert(data.message);
      }

    }
    catch(err){
      setLoading(false);
      console.log(err);
    }

  };

  return (
    <>
      {open === true && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="flex overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Give us a oppurtunity to serve you
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Joh Doe"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone
                    </label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="123456790"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Service"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Choose one of our Service
                    </label>
                    <select
                      name="service"
                      id="service"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    >
                      <option value="">--Select Option--</option>
                      <option value="Bridal Makeup">Bridal Makeup</option>
                      <option value="Hair Style">Hair Style</option>
                      <option value="Nail Manicure">Nail Manicure</option>
                      <option value="Facial Makeup">Facial Makeup</option>
                    </select>
                  </div>

{ loading ?

                  <button
                  type="submit"
                  className="w-full text-white bg-blue-400  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-300 dark:focus:ring-blue-800"
                  disabled
                  >
                  Book Now
                  </button>
                  :
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
