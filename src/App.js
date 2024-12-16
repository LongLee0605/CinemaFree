import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import CartoonMovies from "./components/CartoonMovies";
import MovieDetails from "./components/Details";
import Home from "./components/Home";
import NewMovies from "./components/NewMovies";
import SearchInput from "./components/Search/components/SearchInput";
import SearchResults from "./components/Search/components/SearchResults";
import SeriesMovies from "./components/SeriesMovies";
import SingleMovies from "./components/SingleMovies";
import TVShows from "./components/TVShows";
import store from "./redux/store";

const App = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPage = parseInt(params.get("page")) || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="App">
      <header className="bg-black text-white shadow-md">
        <div className="container px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold z-20">
            <Link to="/">Cinema Free</Link>
          </div>
          <nav className="hidden lg:flex gap-8">
            <Link to="/phim-moi-cap-nhat" className="hover:text-yellow-400">
              Phim mới cập nhật
            </Link>
            <Link to="/phim-le" className="hover:text-yellow-400">
              Phim lẻ
            </Link>
            <Link to="/phim-bo" className="hover:text-yellow-400">
              Phim bộ
            </Link>
            <Link to="/phim-hoat-hinh" className="hover:text-yellow-400">
              Phim hoạt hình
            </Link>
            <Link to="/tv-shows" className="hover:text-yellow-400">
              TV Shows
            </Link>
          </nav>
          <div className=" items-center gap-4 hidden lg:flex">
            <SearchInput />
          </div>
          {/* Icon for mobile */}
          <div className="lg:hidden z-20">
            <button onClick={toggleDropdown} className="text-white">
              {isDropdownOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-slate-950 bg-opacity-50 z-10"
          onClick={toggleDropdown}
        >
          <div
            className="absolute top-16 right-0 w-full bg-black text-white shadow-lg transition-transform duration-500 transform ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-start gap-6 p-4 pb-6 border-[1px]">
              <Link
                to="/phim-moi-cap-nhat"
                className="hover:text-yellow-400"
                onClick={toggleDropdown}
              >
                Phim mới cập nhật
              </Link>
              <Link
                to="/phim-le"
                className="hover:text-yellow-400"
                onClick={toggleDropdown}
              >
                Phim lẻ
              </Link>
              <Link
                to="/phim-bo"
                className="hover:text-yellow-400"
                onClick={toggleDropdown}
              >
                Phim bộ
              </Link>
              <Link
                to="/phim-hoat-hinh"
                className="hover:text-yellow-400"
                onClick={toggleDropdown}
              >
                Phim hoạt hình
              </Link>
              <Link
                to="/tv-shows"
                className="hover:text-yellow-400"
                onClick={toggleDropdown}
              >
                TV Shows
              </Link>
              <div className="flex items-center gap-4">
                <SearchInput />
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/phim-moi-cap-nhat"
            element={<NewMovies currentPage={currentPage} />}
          />
          <Route
            path="/phim-le"
            element={<SingleMovies currentPage={currentPage} />}
          />
          <Route
            path="/phim-bo"
            element={<SeriesMovies currentPage={currentPage} />}
          />
          <Route
            path="/phim-hoat-hinh"
            element={<CartoonMovies currentPage={currentPage} />}
          />
          <Route
            path="/tv-shows"
            element={<TVShows currentPage={currentPage} />}
          />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movie/:slug" element={<MovieDetails />} />
        </Routes>
      </main>
      <div className="text-center border-t-[1px] border-[#fff6] py-5 bg-black">
        <p>Built and designed by Le Tran Dang Long</p>
        <p>Copyright © 2024 All Rights Reserved</p>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default AppWrapper;
