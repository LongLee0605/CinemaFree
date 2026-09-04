import { useNavigate } from 'react-router-dom';
import { Tv } from 'lucide-react';
import { useCategoryMovies } from '@/hooks/useMovies';
import { usePageQuery } from '@/hooks/usePageQuery';
import { MovieList } from '@/components/movies/MovieList';
import { Seo } from '@/components/ui/Seo';

export default function SeriesMovies() {
  const page = usePageQuery();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useCategoryMovies('phim-bo', page);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`, { replace: true });
  };

  return (
    <div className="py-8">
      <Seo title="Phim bộ" description="Kho phim bộ, series dài tập mới nhất trên CinemaFree." />
      <MovieList
        title="Phim Bộ Mới Cập Nhật"
        subtitle="Series phim dài tập hấp dẫn"
        icon={<Tv className="h-5 w-5" />}
        movies={data?.items || []}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
        currentPage={page}
        totalPages={data?.pagination?.totalPages || 1}
        onPageChange={handlePageChange}
        showPagination
      />
    </div>
  );
}
