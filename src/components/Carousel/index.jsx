import React from 'react';

const Carousel = ({ children, title }) => {
  return (
    <div className="carousel-container">
      {title && <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>}
      <div className="carousel-wrapper">
        {children}
      </div>
    </div>
  );
};

export default Carousel;
