import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchSingle, setCurrentPage } from "../../redux/slices/singleSlice";
import { formatDateTimeVN } from "../../utils/dateUtils";
import Loading from "../Loading";

const SingleMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phimLe = useSelector((state) => state.phimLe.items);
  const status = useSelector((state) => state.phimLe.status);
  const error = useSelector((state) => state.phimLe.error);
  const currentPage = useSelector((state) => state.phimLe.currentPage);
  const totalPages = useSelector((state) => state.phimLe.totalPages);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSingle(currentPage));
    }
  }, [status, dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    navigate(`?page=${newPage}`);
    dispatch(fetchSingle(newPage));
  };
  if (status === "loading")
    return (
      <div>
        <Loading />
      </div>
    );
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Phim Lẻ</h2>
      <ul>
        {phimLe.map((movie) => (
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

export default SingleMovies;
