import { useNavigate } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import { useCategoryMovies } from '@/hooks/useMovies';
import { usePageQuery } from '@/hooks/usePageQuery';
import { MovieList } from '@/components/movies/MovieList';
import { Seo } from '@/components/ui/Seo';

export default function TheaterMovies() {
  const page = usePageQuery();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useCategoryMovies('phim-chieu-rap', page);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`, { replace: true });
  };

  return (
    <div className="py-8">
      <Seo
        title="Phim chiếu rạp"
        description="Tuyển chọn phim chiếu rạp, bom tấn mới nhất tại CinemaFree."
      />
      <MovieList
        title="Phim Chiếu Rạp"
        subtitle="Bom tấn đang và sắp chiếu rạp"
        icon={<Clapperboard className="h-5 w-5" />}
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
