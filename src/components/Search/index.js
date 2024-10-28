// components/SearchMovies.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, clearSearchResults } from "../../redux/slices/searchSlice";
import { formatDateTimeVN } from "../../utils/dateUtils";

const SearchMovies = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim()) {
      dispatch(fetchSearchResults({ keyword }));
    }
  };

  const handleClear = () => {
    setKeyword("");
    dispatch(clearSearchResults());
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Tìm Kiếm Phim</h2>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Nhập từ khóa..."
      />
      <button onClick={handleSearch}>Tìm Kiếm</button>
      <button onClick={handleClear}>Xóa Kết Quả</button>

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
    </div>
  );
};

export default SearchMovies;
