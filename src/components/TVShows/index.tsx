import { useNavigate } from 'react-router-dom';
import { Tv } from 'lucide-react';
import { useCategoryMovies } from '@/hooks/useMovies';
import { usePageQuery } from '@/hooks/usePageQuery';
import { MovieList } from '@/components/movies/MovieList';
import { Seo } from '@/components/ui/Seo';

export default function TVShows() {
  const page = usePageQuery();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useCategoryMovies('tv-shows', page);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`, { replace: true });
  };

  return (
    <div className="py-8">
      <Seo
        title="TV Shows"
        description="Chương trình truyền hình, TV Shows đa dạng trên CinemaFree."
      />
      <MovieList
        title="TV Shows Mới Cập Nhật"
        subtitle="Chương trình truyền hình đa dạng"
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
