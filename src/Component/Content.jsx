import React from 'react';
import Carosoul from './Carosoul';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Content() {
  const beauticianCourseImg = ["./src/assets/Beautician Slide 1.jpg","./src/assets/mehendi 1.jpg", "./src/assets/Beautician Slide 2.jpg", "./src/assets/sewing image.jpg","./src/assets/nail-art-1.jpg"];

  const courses = [
  {
    name:"Beautician course - 6 Months",
    description:"Unlock the secrets of skincare, makeup application, and beauty treatments with our comprehensive beautician course. From mastering the fundamentals of skincare to learning advanced makeup techniques, our expert instructors will equip you with the skills and knowledge needed to thrive in the beauty industry.",
    price:"Rs.15000"
  },
  {
    name:"Mehendi Course - 3 Months",
    description:"Embrace the timeless art of mehendi with our specialized course! Explore traditional and contemporary henna designs, and master the intricate patterns and motifs that make each design unique. Whether you're a beginner or looking to refine your skills, our expert-led training will help you become a proficient mehendi artist.",
    price:"Rs.1500"
  },
  {
    name:"Makeup Course - 3 Months",
    description:"Transform your passion for makeup into a successful career with our makeup course! Learn the latest trends, techniques, and product knowledge from industry professionals. From bridal looks to editorial makeup, our hands-on training will prepare you for a variety of opportunities in the dynamic world of makeup artistry.",
    price:"Rs.8000"
  },
  {
    name:"Silai Course - 3 Months",
    description:"Discover the art of sewing with our silai course! From understanding different types of fabrics to mastering essential stitching techniques, our experienced instructors will guide you through every step of the sewing process. Whether you're passionate about fashion design or simply want to create your own wardrobe.",
    price:"Rs.1200"
  },
  {
    name:"Nail Art Course - 3 Months",
    description:"Dive into the colorful world of nail art with our exciting course! Explore a variety of techniques, from intricate designs to dazzling embellishments, and learn how to create stunning nail art masterpieces. Whether you're a beginner or a nail enthusiast, our hands-on training will take your nail styling skills to the next level.",
    price:"Rs.15000"
  },
];


const settings = {
  dots: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 5000,
  cssEase: "linear",
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }
  ]
};

  return (
    <>
<section  className="text-gray-400 body-font bg-gray-900">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-20">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Couses We Offer: </h1>
        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
      </div>
      <p className="lg:w-1/2 w-full leading-relaxed text-lg text-gray-400 text-opacity-90">Welcome to Varsha Mekup Studio, where passion meets profession! Our center offers expert-led courses in Makeup, Beautician, Nail Art, Mehendi, and Silai (sewing), providing hands-on training and personalized instruction. Join us to unleash your creativity and embark on a journey of skill-building and self-expression!</p>
    </div>

    <div id='courses' className="w-full">

      <Slider {...settings}>
      {courses.map((course,index)=>
         <div key={course.name} className="w-full p-4">
                <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                <img className="h-100 rounded w-full object-cover object-center mb-6" src={beauticianCourseImg[index]} alt="content"/>
                <h2 className="text-lg text-white font-medium title-font mb-4">{course.name}</h2>
                <p className="leading-relaxed text-lg">{course.description}</p>
                <h3 className="tracking-widest text-indigo-400 text-lg font-medium title-font">PRICE : {course.price}</h3>
                <div className='bg-indigo-500 rounded text-lg w-1/4 p-2 my-2 hover:bg-indigo-600 cursor-pointer text-white'>Buy Now</div>
              </div>
            </div>
      )}
      </Slider>
    </div>
  </div>
</section>
    </>
  )
}
