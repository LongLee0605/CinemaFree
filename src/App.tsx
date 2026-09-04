import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SearchInput } from '@/components/search/SearchInput';
import { SearchResults } from '@/components/search/SearchResults';
import { Loading } from '@/components/Loading';

const Home = lazy(() => import('@/components/Home'));
const NewMovies = lazy(() => import('@/components/NewMovies'));
const SingleMovies = lazy(() => import('@/components/SingleMovies'));
const SeriesMovies = lazy(() => import('@/components/SeriesMovies'));
const CartoonMovies = lazy(() => import('@/components/CartoonMovies'));
const TVShows = lazy(() => import('@/components/TVShows'));
const MovieDetails = lazy(() => import('@/components/Details'));

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout searchComponent={<SearchInput />}>
        <Suspense fallback={<Loading fullScreen />}>
          {' '}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phim-moi-cap-nhat" element={<NewMovies />} />
            <Route path="/phim-le" element={<SingleMovies />} />
            <Route path="/phim-bo" element={<SeriesMovies />} />
            <Route path="/phim-hoat-hinh" element={<CartoonMovies />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie/:slug" element={<MovieDetails />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
