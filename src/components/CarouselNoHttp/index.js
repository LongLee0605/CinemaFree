import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ itemsCarousel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleItems = () => {
    // Điều chỉnh số lượng items hiển thị dựa trên kích thước màn hình
    const itemsPerSlide = screenWidth >= 1024 ? 4 : screenWidth >= 768 ? 3 : 2;
    return itemsCarousel.slice(currentIndex, currentIndex + itemsPerSlide);
  };

  const getTotalDots = () => {
    // Số lượng dots tùy thuộc vào kích thước màn hình và tổng số items
    if (screenWidth >= 1024) {
      return Math.min(itemsCarousel.length, 8);
    } else if (screenWidth >= 768) {
      return Math.min(itemsCarousel.length, 9);
    } else {
      return Math.min(itemsCarousel.length, 10);
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
          <div className="flex-none w-1/2 md:w-1/3 lg:w-1/4 p-2" key={index}>
            <Link to={`/movie/${item.slug}`}>
              <div className="relative">
                <div className="relative">
                  <img
                    src={`https://phimimg.com/${item.poster_url}`}
                    alt={item.name}
                    className="lg:h-60 md:h-80 h-52"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90"></div>
                </div>
                <div className="absolute bottom-0 left-0 text-gray-200 p-2">
                  <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-white w-28 md:w-44 lg:w-32">
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
            className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-gray-300 w-12 h-3" : "bg-gray-600"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
