import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useLatestMovies } from '@/hooks/useMovies';
import { usePageQuery } from '@/hooks/usePageQuery';
import { MovieList } from '@/components/movies/MovieList';
import { Seo } from '@/components/ui/Seo';

export default function NewMovies() {
  const page = usePageQuery();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useLatestMovies(page);

  useEffect(() => {
    document.title = 'Phim mới cập nhật - CinemaFree';
  }, []);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`, { replace: true });
  };

  return (
    <div className="py-8">
      <Seo
        title="Phim mới cập nhật"
        description="Danh sách phim mới cập nhật mỗi ngày trên CinemaFree."
      />
      <MovieList
        title="Phim Mới Cập Nhật"
        subtitle="Những bộ phim hot nhất vừa được cập nhật"
        icon={<Sparkles className="h-5 w-5" />}
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
