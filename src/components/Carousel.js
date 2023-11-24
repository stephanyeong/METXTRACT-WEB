import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "images/image1.gif",
    "images/image2.gif",
    "images/image3.gif"
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change the interval as needed (in milliseconds)

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="carousel">
      <div className="column1">
        <h2>PUBLICATION MATERIALS</h2>
        <p className="subheader">Empower Your Research: Discover a User-Friendly Hub for Seamless <br />Access and Collaboration on Publication Materials</p>
        <div className="a_button">
          <a href="#" className="additional-link">Access Now</a>
        </div>
      </div>
      <div className="column2">
        <div className="image-container">
          {images.map((image, index) => (
            <div key={index} className={`carousel-image ${index === currentImage ? 'active' : ''}`}>
              <img src={image} alt={`Photo ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
