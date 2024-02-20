import React from 'react'

export default function Testimonial() {
    const testimonials = [
        {
          "name": "Riya Gupta",
          "review": "Bahut acchi service mili yahaan. Mere baal aur chehre ki sundarta ko badhaane ke liye main yahaan hamesha aati hoon.",
          "city": "Delhi"
        },
        {
          "name": "Amit Patel",
          "review": "Yahaan ka staff bahut professional aur mehantashil hai. Mere liye yahaan ek shaandaar baal katvane ka anubhav tha.",
          "city": "Mumbai"
        },
        {
          "name": "Priya Sharma",
          "review": "Maine yahaan par apne shaadi ke liye makeover karaya tha aur mujhe yahaan ka pradarshan bahut pasand aaya. Main zaroor wapas aungi!",
          "city": "Bangalore"
        }
      ];
      
      


  return (
    <section className='w-full bg-gray-900' id='testimonials'>
    <div className="container px-5 py-24 mx-auto  ">
    <div className="text-slate-300 text-3xl text-center font-mono mb-16">Testimonials</div>
    <div className='flex flex-wrap flex-col md:flex-row'>
    {testimonials.map((testimonial,index)=>(
        <div key={index} className="text-gray-400 bg-gray-900 body-font md:w-[30%] py-5 mx-auto ">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-8 h-8 text-gray-500 mb-8" viewBox="0 0 975.036 975.036">
                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
              </svg>
              <p className="leading-relaxed text-lg ">{testimonial.review}</p>
              <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
              <h2 className="text-white font-medium title-font tracking-wider text-sm">{testimonial.name}</h2>
              <p className="text-gray-500">{testimonial.city}</p>
          </div>
        </div>
    ))}
    </div>
    </div>
    </section>
  )
}
