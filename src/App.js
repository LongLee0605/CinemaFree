import React, { useEffect } from "react";
import { Provider } from "react-redux";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPage = parseInt(params.get("page")) || 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <header className="bg-black text-white shadow-md">
        <div className="container px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/">Cenema Free</Link>
          </div>
          <nav className="hidden md:flex gap-8">
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
          <div className="flex items-center gap-4">
            <SearchInput />
          </div>
        </div>
      </header>

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
