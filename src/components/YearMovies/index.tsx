import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useYearMovies } from '@/hooks/useMovies';
import { usePageQuery } from '@/hooks/usePageQuery';
import { MovieList } from '@/components/movies/MovieList';
import { Seo } from '@/components/ui/Seo';

export default function YearMovies() {
  const { year } = useParams<{ year: string }>();
  const page = usePageQuery();
  const navigate = useNavigate();
  const yearValue = year || '';
  const yearLabel = yearValue || 'Không rõ';

  const { data, isLoading, error, refetch } = useYearMovies(yearValue, page);

  useEffect(() => {
    document.title = `Phim năm ${yearLabel} - CinemaFree`;
  }, [yearLabel]);

  const handlePageChange = (newPage: number) => {
    navigate(`/nam/${yearValue}?page=${newPage}`, { replace: true });
  };

  return (
    <div className="py-8">
      <Seo
        title={`Phim năm ${yearLabel}`}
        description={`Xem phim năm ${yearLabel} miễn phí chất lượng cao tại CinemaFree.`}
      />
      <MovieList
        title={`Phim năm ${yearLabel}`}
        subtitle={`Tổng hợp phim năm ${yearLabel} hay nhất`}
        icon={<Calendar className="h-5 w-5" />}
        movies={data?.items || []}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
        currentPage={page}
        totalPages={data?.pagination?.totalPages || 1}
        onPageChange={handlePageChange}
        showPagination
        emptyMessage={`Chưa có phim năm ${yearLabel} nào.`}
      />
    </div>
  );
}
