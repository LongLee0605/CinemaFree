import { useNavigate } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import { useCategoryMovies } from '@/hooks/useMovies';
import { usePageQuery } from '@/hooks/usePageQuery';
import { MovieList } from '@/components/movies/MovieList';
import { Seo } from '@/components/ui/Seo';

export default function SingleMovies() {
  const page = usePageQuery();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useCategoryMovies('phim-le', page);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`, { replace: true });
  };

  return (
    <div className="py-8">
      <Seo
        title="Phim lẻ"
        description="Kho phim lẻ chất lượng cao, đa dạng thể loại trên CinemaFree."
      />
      <MovieList
        title="Phim Lẻ Mới Cập Nhật"
        subtitle="Tuyển chọn phim lẻ hay nhất"
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
