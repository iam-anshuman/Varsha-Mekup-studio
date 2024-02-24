import React from 'react';
import Hero from '../Component/Hero';
import Content from '../Component/Content';
import Contact from '../Component/Contact';
import Services from '../Component/Services';
import Testimonial from '../Component/Testimonial';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Content />
      <Services />
      <Testimonial />
      <Contact />
    </>
  );
}
