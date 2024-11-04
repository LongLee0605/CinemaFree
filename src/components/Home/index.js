
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    fetchLatestMovies,
    setCurrentPage,
} from "../../redux/slices/homeSlice";
import { formatDateTimeVN } from "../../utils/dateUtils";

const Home = ({ currentPage }) => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const latestMovies = useSelector((state) => state.latestMovies.items);
  const status = useSelector((state) => state.latestMovies.status);
  const error = useSelector((state) => state.latestMovies.error);
  const totalPages = useSelector((state) => state.latestMovies.totalPages);

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
    dispatch(fetchLatestMovies(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    navigate(`?page=${newPage}`); 
    dispatch(fetchLatestMovies(newPage));
  };

  if (status === "loading") return <div>Loading...</div>;

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Latest Movies</h2>
      <ul>
        {latestMovies.map((movie) => (
          <li key={movie._id} className="py-4">
            <Link to={`/movie/${movie.slug}`}>
              <h3 className="py-2">
                {movie.name} ({movie.year})
              </h3>
            </Link>
            <div className="flex gap-10">
              <div>
                <img
                  src={movie.poster_url}
                  alt={movie.name}
                  style={{ width: "150px" }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Tên gốc: {movie.origin_name}</p>
                <p>Năm ra mắt: {movie.year}</p>
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

export default Home;
