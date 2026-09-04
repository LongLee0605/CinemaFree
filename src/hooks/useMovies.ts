import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getLatestMovies,
  getMoviesByCategory,
  getMovieDetail,
  searchMovies,
} from '@/services/movieApi';
import type { MovieCategory, MovieDetailResponse } from '@/types/movie';

export const movieKeys = {
  all: ['movies'] as const,
  latest: (page: number) => [...movieKeys.all, 'latest', page] as const,
  category: (category: MovieCategory, page: number) =>
    [...movieKeys.all, 'category', category, page] as const,
  search: (keyword: string) => [...movieKeys.all, 'search', keyword] as const,
  detail: (slug: string) => [...movieKeys.all, 'detail', slug] as const,
};

export const useLatestMovies = (page = 1) => {
  return useQuery({
    queryKey: movieKeys.latest(page),
    queryFn: () => getLatestMovies(page),
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
    select: (data) => ({
      items: data.data?.items || [],
      pagination: data.data?.params?.pagination,
    }),
  });
};

export const useMovieDetail = (slug: string) => {
  return useQuery<MovieDetailResponse, Error>({
    queryKey: movieKeys.detail(slug),
    queryFn: () => getMovieDetail(slug),
    enabled: !!slug,
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
  });
};
