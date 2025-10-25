import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchLatestMovies,
  setCurrentPage,
} from "../../redux/slices/homeSlice";
import { fetchSingle } from "../../redux/slices/singleSlice";
import { fetchSeries } from "../../redux/slices/seriesSlice";
import { fetchTVShow } from "../../redux/slices/tvShowSlice";
import { fetchCartoon } from "../../redux/slices/cartoonSlice";
import { formatDateTimeVN } from "../../utils/dateUtils";
import Loading from "../Loading/index.jsx";

function NewMovies({ currentPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phimLe = useSelector((state) => state.phimLe.items);
  const phimBo = useSelector((state) => state.phimBo.items);
  const tvShows = useSelector((state) => state.tvShows.items);
  const hoatHinh = useSelector((state) => state.hoatHinh.items);
  const latestMovies = useSelector((state) => state.latestMovies.items);
  const status = useSelector((state) => state.latestMovies.status);
  const error = useSelector((state) => state.latestMovies.error);
  const totalPages = useSelector((state) => state.latestMovies.totalPages);

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
    dispatch(fetchLatestMovies(currentPage));
    dispatch(fetchSingle(currentPage));
    dispatch(fetchSeries(currentPage));
    dispatch(fetchTVShow(currentPage));
    dispatch(fetchCartoon(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    navigate(`?page=${newPage}`);
    dispatch(fetchLatestMovies(newPage));
    dispatch(fetchSingle(newPage));
    dispatch(fetchSeries(newPage));
    dispatch(fetchTVShow(newPage));
    dispatch(fetchCartoon(newPage));
  };

  const getEpisodeStatus = (movieId) => {
    let matchedMovie =
      phimLe.find((item) => item._id === movieId) ||
      phimBo.find((item) => item._id === movieId) ||
      tvShows.find((item) => item._id === movieId) ||
      hoatHinh.find((item) => item._id === movieId);

    return matchedMovie ? matchedMovie.episode_current : "N/A";
  };

  const getUpdateTime = (movieId) => {
    let matchedMovie =
      phimLe.find((item) => item._id === movieId) ||
      phimBo.find((item) => item._id === movieId) ||
      tvShows.find((item) => item._id === movieId) ||
      hoatHinh.find((item) => item._id === movieId);

    return matchedMovie ? matchedMovie?.time : "Không rõ";
  };

  if (status === "loading")
    return (
      <div>
        <Loading />
      </div>
    );

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <>
      <div className="container mx-0">
        <h2 className="text-white text-2xl font-semibold">Phim Mới Cập Nhật</h2>
        <div className="flex">
          <div className="w-full lg:w-3/4 px-4">
            <ul className="flex flex-wrap gap-5 justify-between">
              {latestMovies.map((movie) => (
                <li
                  key={movie._id}
                  className="py-4 px-3 shadow-md shadow-gray-500/50 rounded-xl w-full lg:w-[46%] md:w-[48%] sm:w-[48%]"
                >
                  <Link to={`/movie/${movie.slug}`}>
                    <h3 className="py-2 text-white text-lg font-semibold">
                      {movie.name} ({movie.year})
                    </h3>
                    <div className="flex gap-5">
                      <div className="flex items-center w-2/5">
                        <img
                          src={movie.poster_url}
                          alt={movie.name}
                          style={{
                            width: "150px",
                            objectFit: "cover",
                            height: "200px",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-3/5">
                        <p>Tên gốc: {movie.origin_name}</p>
                        <p>Năm ra mắt: {movie.year}</p>
                        <p>
                          Ngày cập nhật:{" "}
                          {formatDateTimeVN(movie.modified?.time)}
                        </p>
                        <p>Tình trạng: {getEpisodeStatus(movie._id)}</p>
                        <p>Thời lượng: {getUpdateTime(movie._id)}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/4 hidden lg:block">SideBar</div>
        </div>

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
    </>
  );
}

export default NewMovies;
