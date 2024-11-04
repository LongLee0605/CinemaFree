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
      <SearchInput />
      <nav>
        <ul className="flex gap-10">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/phim-moi-cap-nhat">Phim mới cập nhật</Link>
          </li>
          <li>
            <Link to="/phim-le">Phim lẻ</Link>
          </li>
          <li>
            <Link to="/phim-bo">Phim bộ</Link>
          </li>
          <li>
            <Link to="/phim-hoat-hinh">Phim hoạt hình</Link>
          </li>
          <li>
            <Link to="/tv-shows">TV Shows</Link>
          </li>
        </ul>
      </nav>

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
