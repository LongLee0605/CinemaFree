import api from './api';
import type {
  CategoryMoviesResponse,
  LatestMoviesResponse,
  MovieCategory,
  MovieDetailResponse,
  SearchMoviesResponse,
} from '@/types/movie';

export const getLatestMovies = async (page = 1): Promise<LatestMoviesResponse> => {
  const response = await api.get<LatestMoviesResponse>('/danh-sach/phim-moi-cap-nhat', {
    params: { page },
  });
  return response.data;
};

export const getMoviesByCategory = async (
  category: MovieCategory,
  page = 1
): Promise<CategoryMoviesResponse> => {
  const response = await api.get<CategoryMoviesResponse>(`/v1/api/danh-sach/${category}`, {
    params: { page },
  });
  return response.data;
};

export const getMoviesByGenre = async (
  genreSlug: string,
  page = 1
): Promise<CategoryMoviesResponse> => {
  const response = await api.get<CategoryMoviesResponse>(`/v1/api/the-loai/${genreSlug}`, {
    params: { page },
  });
  return response.data;
};

export const getMoviesByCountry = async (
  countrySlug: string,
  page = 1
): Promise<CategoryMoviesResponse> => {
  const response = await api.get<CategoryMoviesResponse>(`/v1/api/quoc-gia/${countrySlug}`, {
    params: { page },
  });
  return response.data;
};

export const getMoviesByYear = async (year: string, page = 1): Promise<CategoryMoviesResponse> => {
  const response = await api.get<CategoryMoviesResponse>(`/v1/api/nam/${year}`, {
    params: { page },
  });
  return response.data;
};

export const searchMovies = async (
  keyword: string,
  page = 1,
  limit = 20
): Promise<SearchMoviesResponse> => {
  const response = await api.get<SearchMoviesResponse>('/v1/api/tim-kiem', {
    params: { keyword, page, limit },
  });
  return response.data;
};

export const getMovieDetail = async (slug: string): Promise<MovieDetailResponse> => {
  const response = await api.get<MovieDetailResponse>(`/phim/${slug}`);
  return response.data;
};
