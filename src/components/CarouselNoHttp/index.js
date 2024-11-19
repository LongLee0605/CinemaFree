import React, { useState } from "react";
import { Link } from "react-router-dom";

const CarouselNoHttp = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;

  const totalItems = items.length;

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (totalItems - itemsToShow + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + totalItems) % (totalItems - itemsToShow + 1)
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-1/4 py-4 flex-shrink-0 flex justify-center"
          >
            <Link to={`/movie/${item.slug}`}>
              <div className=" w-full shadow-md ">
                <div>
                  <div className="relative pb-2">
                    <img
                      src={`https://phimimg.com/${item.poster_url}`}
                      alt={item.name}
                      className="object-cover h-60 w-full object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
                  </div>
                  <div className="w-44">
                    <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-[#fff8]">{item.year}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#00000087] text-2xl text-white p-2 rounded"
      >
        &#8882;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#00000087] text-2xl text-white p-2 rounded"
      >
        &#8883;
      </button>
    </div>
  );
};

export default CarouselNoHttp;
