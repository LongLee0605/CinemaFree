export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface TimeInfo {
  time: string;
}

export interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  thumb_url: string;
  poster_url: string;
  year: number;
  episode_current?: string;
  episode_total?: string;
  quality?: string;
  lang?: string;
  time?: string;
  status?: string;
  content?: string;
  type?: string;
  category?: Category[];
  country?: Country[];
  actor?: string[];
  director?: string[];
  modified?: TimeInfo;
  created?: TimeInfo;
}

export interface EpisodeServerData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8?: string;
}

export interface EpisodeServer {
  server_name: string;
  server_data: EpisodeServerData[];
}

export interface MovieDetail extends Movie {
  content: string;
  type: string;
  status: string;
  is_copyright?: boolean | string;
  sub_docquyen?: boolean | string;
  chieurap?: boolean | string;
  trailer_url?: string;
  notify?: string;
  showtimes?: string;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
  created: TimeInfo;
  modified: TimeInfo;
}

export interface MovieDetailResponse {
  status: boolean;
  msg?: string;
  movie: MovieDetail;
  episodes: EpisodeServer[];
}

export interface Pagination {
  totalItems: number;
  totalItemsPerPage?: number;
  currentPage?: number;
  totalPages: number;
}

export interface LatestMoviesResponse {
  status: boolean;
  items: Movie[];
  pagination: Pagination;
}

export interface CategoryMoviesData {
  items: Movie[];
  titlePage?: string;
  params: {
    pagination: Pagination;
    type_slug?: string;
    filterCategory?: string[];
    filterCountry?: string[];
    filterYear?: string;
    filterType?: string;
    sort_field?: string;
    sort_type?: string;
  };
}

export interface CategoryMoviesResponse {
  status: boolean;
  msg?: string;
  data: CategoryMoviesData;
}

export interface SearchMoviesData {
  items: Movie[];
  params: {
    keyword: string;
    pagination: Pagination;
  };
}

export interface SearchMoviesResponse {
  status: boolean;
  msg?: string;
  data: SearchMoviesData;
}

export type MovieCategory = 'phim-le' | 'phim-bo' | 'hoat-hinh' | 'tv-shows' | 'phim-chieu-rap';

export interface PageParams {
  page?: number;
  limit?: number;
}

export interface SearchParams extends PageParams {
  keyword: string;
}
