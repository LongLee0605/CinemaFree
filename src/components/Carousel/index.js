import React, { useState } from "react";
import { Link } from "react-router-dom";

const Carousel = ({
  items,
  infiniteLoop = false,
  showDots = true,
  showButtons = false,
  moviesNoHTTP = false,
  moviesHTTP = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;

  // Move by 2 items
  const nextSlide = () => {
    if (infiniteLoop) {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % totalItems);
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex < totalItems - 2 ? prevIndex + 2 : prevIndex
      );
    }
  };

  const prevSlide = () => {
    if (infiniteLoop) {
      setCurrentIndex((prevIndex) => (prevIndex - 2 + totalItems) % totalItems);
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex > 1 ? prevIndex - 2 : prevIndex
      );
    }
  };

  const totalDots = Math.ceil(totalItems / 2); // Update to reflect 2 items per slide

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-1/2 pb-10 pt-4 flex-shrink-0 flex justify-center"
          >
            <Link to={`/movie/${item.slug}`}>
              <div className="bg-gray-200 w-80 shadow-md relative">
                <div>
                  {moviesHTTP && (
                    <img
                      src={item.poster_url}
                      alt={item.name}
                      className="object-cover h-[400px] w-full object-top"
                    />
                  )}
                  {moviesNoHTTP && (
                    <img
                      src={`https://phimimg.com/${item.poster_url}`}
                      alt={item.name}
                      className="object-cover h-[400px] w-full object-top"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
                  <div className="absolute bottom-4 left-2 text-lg text-white p-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm">{item.year}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {showDots && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index * 2)} // Adjust the index to skip to the correct slide
              className={`h-2 ${
                index * 2 === currentIndex ? "w-6" : "w-2"
              } rounded ${
                index * 2 === currentIndex ? "bg-white" : "bg-gray-400"
              } cursor-pointer transition-all duration-300`}
            />
          ))}
        </div>
      )}
      {showButtons && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded"
          >
            Prev
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded"
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
