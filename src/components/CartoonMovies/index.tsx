import { useNavigate } from 'react-router-dom';
import { Baby } from 'lucide-react';
import { useCategoryMovies } from '@/hooks/useMovies';
import { usePageQuery } from '@/hooks/usePageQuery';
import { MovieList } from '@/components/movies/MovieList';
import { Seo } from '@/components/ui/Seo';

export default function CartoonMovies() {
  const page = usePageQuery();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useCategoryMovies('hoat-hinh', page);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`, { replace: true });
  };

  return (
    <div className="py-8">
      <Seo
        title="Phim hoạt hình"
        description="Kho phim hoạt hình đa dạng cho mọi lứa tuổi trên CinemaFree."
      />
      <MovieList
        title="Phim Hoạt Hình Mới Cập Nhật"
        subtitle="Phim hoạt hình cho mọi lứa tuổi"
        icon={<Baby className="h-5 w-5" />}
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
