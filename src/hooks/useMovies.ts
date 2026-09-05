import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getLatestMovies,
  getMoviesByCategory,
  getMoviesByCountry,
  getMoviesByGenre,
  getMoviesByYear,
  getMovieDetail,
  searchMovies,
} from '@/services/movieApi';
import type { MovieCategory, MovieDetailResponse } from '@/types/movie';

const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const movieKeys = {
  all: ['movies'] as const,
  latest: (page: number) => [...movieKeys.all, 'latest', page] as const,
  category: (category: MovieCategory, page: number) =>
    [...movieKeys.all, 'category', category, page] as const,
  genre: (slug: string, page: number) => [...movieKeys.all, 'genre', slug, page] as const,
  country: (slug: string, page: number) => [...movieKeys.all, 'country', slug, page] as const,
  year: (year: string, page: number) => [...movieKeys.all, 'year', year, page] as const,
  search: (keyword: string) => [...movieKeys.all, 'search', keyword] as const,
  detail: (slug: string) => [...movieKeys.all, 'detail', slug] as const,
};

export const useLatestMovies = (page = 1) => {
  return useQuery({
    queryKey: movieKeys.latest(page),
    queryFn: () => getLatestMovies(page),
    staleTime: DEFAULT_STALE_TIME,
    select: (data) => ({
      items: data.items || [],
      pagination: data.pagination,
    }),
  });
};

export const useCategoryMovies = (category: MovieCategory, page = 1) => {
  return useQuery({
    queryKey: movieKeys.category(category, page),
    queryFn: () => getMoviesByCategory(category, page),
    staleTime: DEFAULT_STALE_TIME,
    select: (data) => ({
      items: data.data?.items || [],
      pagination: data.data?.params?.pagination,
    }),
  });
};

export const useGenreMovies = (genreSlug: string, page = 1) => {
  return useQuery({
    queryKey: movieKeys.genre(genreSlug, page),
    queryFn: () => getMoviesByGenre(genreSlug, page),
    enabled: genreSlug.length > 0,
    staleTime: DEFAULT_STALE_TIME,
    select: (data) => ({
      items: data.data?.items || [],
      pagination: data.data?.params?.pagination,
      title: data.data?.titlePage,
    }),
  });
};

export const useCountryMovies = (countrySlug: string, page = 1) => {
  return useQuery({
    queryKey: movieKeys.country(countrySlug, page),
    queryFn: () => getMoviesByCountry(countrySlug, page),
    enabled: countrySlug.length > 0,
    staleTime: DEFAULT_STALE_TIME,
    select: (data) => ({
      items: data.data?.items || [],
      pagination: data.data?.params?.pagination,
      title: data.data?.titlePage,
    }),
  });
};

export const useYearMovies = (year: string, page = 1) => {
  return useQuery({
    queryKey: movieKeys.year(year, page),
    queryFn: () => getMoviesByYear(year, page),
    enabled: year.length > 0,
    staleTime: DEFAULT_STALE_TIME,
    select: (data) => ({
      items: data.data?.items || [],
      pagination: data.data?.params?.pagination,
      title: data.data?.titlePage,
    }),
  });
};

export const useMovieDetail = (slug: string) => {
  return useQuery<MovieDetailResponse, Error>({
    queryKey: movieKeys.detail(slug),
    queryFn: () => getMovieDetail(slug),
    enabled: !!slug,
    staleTime: DEFAULT_STALE_TIME,
    retry: false,
  });
};

export const useSearchMovies = (keyword: string, limit = 20) => {
  return useInfiniteQuery({
    queryKey: movieKeys.search(keyword),
    queryFn: ({ pageParam = 1 }) => searchMovies(keyword, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const pagination = lastPage.data?.params?.pagination;
      if (!pagination) return undefined;
      const nextPage = allPages.length + 1;
      return nextPage <= pagination.totalPages ? nextPage : undefined;
    },
    enabled: keyword.trim().length > 0,
    staleTime: DEFAULT_STALE_TIME,
  });
};

export { getMoviesByCategory, getMoviesByGenre, getMoviesByCountry, getMoviesByYear };
