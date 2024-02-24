import React, { useState } from 'react';
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsNoiseReduction,
} from 'react-icons/bs';

export default function Carosoul(props) {
  const beauticianCourseImg = [
    {
      url: props.img1,
    },
    {
      url: props.img2,
    },
    {
      url: props.img3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstIndex = currentIndex === 0;
    const newIndex = isFirstIndex
      ? beauticianCourseImg.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nexrSlide = () => {
    const isLastIndex = currentIndex === beauticianCourseImg.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="max-w-[780px] h-[780px] w-full m-auto py-16 px-4 relative group">
      <div
        style={{
          backgroundImage: `url('${beauticianCourseImg[currentIndex].url}')`,
        }}
        className="w-full h-full rounded-2xl bg-center bg-cover bg-no-repeat ease-out duration-500"
      ></div>
      {/* Left Arrow */}
      <div>
        <BsChevronCompactLeft
          onClick={prevSlide}
          size={30}
          className="hidden group-hover:block absolute top-[50%] left-5 -translate-x-0 translate-y-[-50%] tex-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        />
      </div>
      {/* Right Arrow */}
      <div>
        <BsChevronCompactRight
          onClick={nexrSlide}
          size={30}
          className="hidden group-hover:block absolute top-[50%] right-5 -translate-x-0 translate-y-[-50%]  tex-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        />
      </div>
    </div>
  );
}
