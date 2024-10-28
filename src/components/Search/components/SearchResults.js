// components/Search/components/SearchResults.js
import React from "react";
import { useSelector } from "react-redux";
import { formatDateTimeVN } from "../../../utils/dateUtils";

const SearchResults = () => {
  const searchResults = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  return (
    <ul>
      {searchResults.map((movie) => (
        <li key={movie._id} className="py-4">
          <h3 className="py-2">
            {movie.name} ({movie.year})
          </h3>
          <div className="flex gap-10">
            <div>
              <img
                src={`https://phimimg.com/${movie.poster_url}`}
                alt={movie.name}
                style={{ width: "150px" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Tình trạng: {movie.episode_current}</p>
              <p>Chất lượng: {movie.quality}</p>
              <p>Thời lượng: {movie.time}</p>
              <p>Ngôn ngữ: {movie.lang}</p>
              <p>
                Thể loại: {movie.category.map((cat) => cat.name).join(", ")}
              </p>
              <p>
                Quốc gia:{" "}
                {movie.country.map((country) => country.name).join(", ")}
              </p>
              <p>Ngày cập nhật: {formatDateTimeVN(movie.modified.time)}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
