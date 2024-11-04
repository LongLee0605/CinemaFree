import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTVShow, setCurrentPage } from "../../redux/slices/tvShowSlice";
import { formatDateTimeVN } from "../../utils/dateUtils";
import { Link } from "react-router-dom";

const TVShows = () => {
  const dispatch = useDispatch();
  const tvShows = useSelector((state) => state.tvShows.items);
  const status = useSelector((state) => state.tvShows.status);
  const error = useSelector((state) => state.tvShows.error);
  const currentPage = useSelector((state) => state.tvShows.currentPage);
  const totalPages = useSelector((state) => state.tvShows.totalPages);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTVShow(currentPage));
    }
  }, [status, dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    dispatch(fetchTVShow(newPage));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h2>TV Shows</h2>
      <ul>
        {tvShows.map((movie) => (
          <li key={movie._id} className="py-4">
            <Link to={`/movie/${movie.slug}`}>
              <h3 className="py-2">
                {movie.name} ({movie.year})
              </h3>
            </Link>
            <div className="flex gap-10">
              <div>
                <img
                  src={`https://phimimg.com/${movie.poster_url}`}
                  alt={movie.name}
                  style={{ width: "150px" }}
                />
              </div>
              <div>
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
      <div className="flex justify-center gap-5 py-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr;
        </button>
        <div>
          {currentPage} / {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default TVShows;
