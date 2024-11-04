import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults } from "../../../redux/slices/searchSlice";
import { formatDateTimeVN } from "../../../utils/dateUtils";
import Loading from "../../Loading";

const SearchResults = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);
  const totalPages = useSelector((state) => state.search.totalPages);
  const currentPage = useSelector((state) => state.search.currentPage);
  const isFetchingMore = useSelector((state) => state.search.isFetchingMore);
  const limit = 20;

  const handleLoadMore = () => {
    if (!isFetchingMore) {
      dispatch(
        fetchSearchResults({ keyword: "kiem", limit, page: currentPage + 1 })
      );
    }
  };

  if (status === "loading" && currentPage === 1)
    return (
      <div>
        <Loading />
      </div>
    );
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
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
      {totalPages - currentPage > 0 && (
        <button onClick={handleLoadMore} disabled={isFetchingMore}>
          {isFetchingMore ? (
            <div>
              <Loading />
            </div>
          ) : (
            "Load More"
          )}
        </button>
      )}
    </div>
  );
};

export default SearchResults;
