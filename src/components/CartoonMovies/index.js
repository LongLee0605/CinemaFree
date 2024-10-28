import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartoon } from "../../redux/slices/cartoonSlice";
import { formatDateTimeVN } from "../../utils/dateUtils";

const CartoonMovies = () => {
  const dispatch = useDispatch();
  const hoatHinh = useSelector((state) => state.hoatHinh.items);
  const status = useSelector((state) => state.hoatHinh.status);
  const error = useSelector((state) => state.hoatHinh.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCartoon());
    }
  }, [status, dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Phim Hoạt Hình</h2>
      <ul>
        {hoatHinh.map((movie) => (
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

export default CartoonMovies;
