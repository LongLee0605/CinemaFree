import React, { useState } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = items.length;
  const totalDots = Math.ceil(totalItems / 3.5);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 gap-8 pb-6"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[30%] pt-4 flex-shrink-0 flex justify-center "
          >
            <Link to={`/movie/${item.slug}`} style={{ width: "100%" }}>
              <div className="shadow-md relative">
                <div className="flex justify-center">
                  <img
                    src={item.poster_url}
                    alt={item.name}
                    className="object-top h-96 object-cover w-full"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
                  <div className="absolute bottom-4 left-0 text-lg text-white p-4 w-full">
                    <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-white">
                      {item.name}
                    </p>
                    <p className="text-sm">{item.year}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: totalDots }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 ${index === currentIndex ? "w-8" : "w-2"} rounded ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            } cursor-pointer transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
