import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartoon, setCurrentPage } from "../../redux/slices/cartoonSlice";
import { formatDateTimeVN } from "../../utils/dateUtils";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading";

const CartoonMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hoatHinh = useSelector((state) => state.hoatHinh.items);
  const status = useSelector((state) => state.hoatHinh.status);
  const error = useSelector((state) => state.hoatHinh.error);
  const currentPage = useSelector((state) => state.hoatHinh.currentPage);
  const totalPages = useSelector((state) => state.hoatHinh.totalPages);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCartoon(currentPage));
    }
  }, [status, dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    navigate(`?page=${newPage}`);
    dispatch(fetchCartoon(newPage));
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
      <h2>Phim Hoạt Hình</h2>
      <ul>
        {hoatHinh.map((movie) => (
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

export default CartoonMovies;
