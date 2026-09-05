import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ghost } from 'lucide-react';
import { useGenreMovies } from '@/hooks/useMovies';
import { usePageQuery } from '@/hooks/usePageQuery';
import { MovieList } from '@/components/movies/MovieList';
import { Seo } from '@/components/ui/Seo';

const genreLabels: Record<string, string> = {
  'hanh-dong': 'Hành động',
  'kinh-di': 'Kinh dị',
  'hoat-hinh': 'Hoạt hình',
  'co-trang': 'Cổ trang',
  hai: 'Hài hước',
  'tam-ly': 'Tâm lý',
  'hinh-su': 'Hình sự',
  'vien-tuong': 'Viễn tưởng',
  'chien-tranh': 'Chiến tranh',
  'the-thao': 'Thể thao',
  'tai-lieu': 'Tài liệu',
  'tv-shows': 'TV Shows',
};

export default function GenreMovies() {
  const { slug } = useParams<{ slug: string }>();
  const page = usePageQuery();
  const navigate = useNavigate();
  const genreSlug = slug || '';
  const genreName = genreLabels[genreSlug] || genreSlug;

  const { data, isLoading, error, refetch } = useGenreMovies(genreSlug, page);

  useEffect(() => {
    document.title = `${genreName} - CinemaFree`;
  }, [genreName]);

  const handlePageChange = (newPage: number) => {
    navigate(`/the-loai/${genreSlug}?page=${newPage}`, { replace: true });
  };

  return (
    <div className="py-8">
      <Seo
        title={genreName}
        description={`Xem phim ${genreName} miễn phí chất lượng cao tại CinemaFree.`}
      />
      <MovieList
        title={`Phim ${genreName}`}
        subtitle={`Kho phim ${genreName} mới nhất, cập nhật liên tục`}
        icon={<Ghost className="h-5 w-5" />}
        movies={data?.items || []}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
        currentPage={page}
        totalPages={data?.pagination?.totalPages || 1}
        onPageChange={handlePageChange}
        showPagination
        emptyMessage={`Chưa có phim ${genreName} nào.`}
      />
    </div>
  );
}
