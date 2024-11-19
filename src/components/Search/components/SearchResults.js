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
    <>
      <div className="container mx-0">
        <h2 className="text-white text-2xl font-semibold">Phim Mới Cập Nhật</h2>
        <div className="flex">
          <div className="w-3/4 px-4">
            <ul className="flex flex-wrap gap-5 justify-between">
              {searchResults.map((movie) => (
                <li
                  key={movie._id}
                  className="py-4 px-3 shadow-md shadow-gray-500/50 rounded-xl w-[46%]"
                >
                  <h3 className="py-2">
                    {movie.name} ({movie.year})
                  </h3>
                  <div className="flex gap-10">
                    <div className="flex items-center w-2/5">
                      <img
                        src={`https://phimimg.com/${movie.poster_url}`}
                        alt={movie.name}
                        style={{
                          width: "150px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-3/5">
                      <p>Tình trạng: {movie.episode_current}</p>
                      <p>Chất lượng: {movie.quality}</p>
                      <p>Thời lượng: {movie.time}</p>
                      <p>Ngôn ngữ: {movie.lang}</p>
                      <p>
                        Thể loại:{" "}
                        {movie.category.map((cat) => cat.name).join(", ")}
                      </p>
                      <p>
                        Quốc gia:{" "}
                        {movie.country
                          .map((country) => country.name)
                          .join(", ")}
                      </p>
                      <p>
                        Ngày cập nhật: {formatDateTimeVN(movie.modified.time)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>{" "}
            {totalPages - currentPage > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={isFetchingMore}
                  className="border-[1px] border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-200 hover:text-gray-800"
                >
                  {isFetchingMore ? (
                    <div>
                      <Loading />
                    </div>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="w-1/4"></div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
