// App.js
import React from "react";
import { Provider } from "react-redux";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CartoonMovies from "./components/CartoonMovies";
import SeriesMovies from "./components/SeriesMovies";
import SingleMovies from "./components/SingleMovies";
import TVShows from "./components/TVShows";
import SearchInput from "./components/Search/components/SearchInput";
import SearchResults from "./components/Search/components/SearchResults";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <SearchInput />
          <nav>
            <ul className="flex gap-10">
              <li>
                <Link to="/single-movies">Phim lẻ</Link>
              </li>
              <li>
                <Link to="/series-movies">Phim bộ</Link>
              </li>
              <li>
                <Link to="/cartoon-movies">Phim hoạt hình</Link>
              </li>
              <li>
                <Link to="/tv-shows">TV Shows</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/single-movies" element={<SingleMovies />} />
            <Route path="/series-movies" element={<SeriesMovies />} />
            <Route path="/cartoon-movies" element={<CartoonMovies />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
