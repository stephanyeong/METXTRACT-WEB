import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  const renderSlides = () => {
    const images = [
      'https://via.placeholder.com/700x700?text=Slide%201',
      'https://via.placeholder.com/700x700?text=Slide%202',
      'https://via.placeholder.com/700x700?text=Slide%203',
    ];

    return images.map((image, index) => (
      <div
        key={index}
        className={`carousel-item ${activeIndex === index ? 'active' : ''}`}
        style={{
          background: `url("${image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    ));
  };

  return <div className="carousel">{renderSlides()}</div>;
};

export default Carousel;
