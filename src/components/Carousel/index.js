import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ itemsCarousel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleItems = () => {
    const itemsPerSlide = screenWidth >= 1024 ? 3 : screenWidth >= 768 ? 2 : 1;
    return itemsCarousel.slice(currentIndex, currentIndex + itemsPerSlide);
  };

  const getTotalDots = () => {
    if (screenWidth >= 1024) {
      return Math.min(itemsCarousel.length, 7);
    } else if (screenWidth >= 768) {
      return Math.min(itemsCarousel.length, 8);
    } else {
      return Math.min(itemsCarousel.length, 9);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex overflow-hidden py-8">
        {getVisibleItems().map((item, index) => (
          <div className="flex-none w-full md:w-1/2 lg:w-1/3 p-4" key={index}>
            <Link to={`/movie/${item.slug}`}>
              <div className="relative">
                <div className="relative">
                  <img src={item.poster_url} alt={item.name} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90"></div>
                </div>
                <div className="absolute bottom-0 left-0 text-gray-200 p-2">
                  <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-white w-56">
                    {item.name}
                  </p>
                  <p>{item.year}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-2 py-2">
        {Array.from({ length: getTotalDots() }).map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-gray-300 w-12 h-3"
                : "bg-gray-600 w-3 h-3"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
