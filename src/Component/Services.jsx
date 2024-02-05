import React from 'react'

export default function Services() {
  return (
    <>
    <section id='services' className=' bg-gray-900'>
        <div className="container px-5 py-28 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="sm::text-3xl text-2xl font-medium title-font mb-2 text-white">Services : </h1>
        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
      <p className="lg:w-1/2 w-full leading-relaxed text-lg text-gray-400 text-opacity-90">Welcome to Varsha Mekup Studio! We're here to make you look and feel amazing. Whether you're in need of a relaxing facial, a stylish haircut, or a perfect manicure, our talented team has got you covered. Sit back, relax, and let us take care of all your beauty needs. Book your appointment now for a pampering experience like no other!</p>
    </div>
      <div className='grid md:grid-cols-4 sm:grid-cols-1 w-full mx-auto mt-4'>
        <div className='bg-slate-700 text-3xl  text-center text-white py-28'>
              <div className='bg-slate-100 h-1 rounded w-1/4 mx-auto  my-5'></div>
              <div className='text-center '>Bridal Makeup</div>
              <div className='text-xl cursor-pointer hover:text-gray-300 my-2'>Book Now &gt;</div>
        </div>
            <div className=' text-white hover:scale-110 cursor-pointer ease-out duration-500'>
              <img src="./src/assets/bridal-makeup.jpg" alt='Bridal Makeup'/>
            </div>
            <div className='bg-slate-600 text-3xl  text-center text-white py-28'>
              <div className='bg-slate-100 h-1 rounded w-1/4 mx-auto my-5'></div>
              <div className='text-center'>Hair Style</div>
              <div className='text-xl cursor-pointer hover:text-gray-300 my-2'>Book Now &gt;</div>
            </div>
            <div className=' text-white hover:scale-110 cursor-pointer ease-out duration-500'>
              <img src="./src/assets/hair-style.jpg" alt="HairStyle" />
            </div>
            <div className='bg-slate-600 text-3xl  text-center text-white py-28'>
              <div className='bg-slate-100 h-1 rounded w-1/4 mx-auto my-5'></div>
              <div className='text-cente'>Nail Manicure</div>
              <div className='text-xl cursor-pointer hover:text-gray-300 my-2'>Book Now &gt;</div>
            </div>
            <div className=' text-white hover:scale-110 cursor-pointer ease-out duration-500'>
              <img src="./src/assets/nail-art.jpg" alt="Nail Art" />

            </div>
            <div className='bg-slate-700 text-3xl  text-center text-white py-28'>
              <div className='bg-slate-100 h-1 rounded w-1/4 mx-auto my-5'></div>
              <div className='text-center '>Facial Makeup</div>
              <div className='text-xl cursor-pointer hover:text-gray-300 my-2'>Book Now &gt;</div>
          </div>
            <div className=' text-white hover:scale-110 cursor-pointer ease-out duration-500'>
            <img src="./src/assets/facial.jpg" alt="Facial" />

          </div>
      </div>  
      </div>
    </section>
    </>
  )
}
