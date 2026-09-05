import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useCountryMovies } from '@/hooks/useMovies';
import { usePageQuery } from '@/hooks/usePageQuery';
import { MovieList } from '@/components/movies/MovieList';
import { Seo } from '@/components/ui/Seo';

const countryLabels: Record<string, string> = {
  'viet-nam': 'Việt Nam',
  'trung-quoc': 'Trung Quốc',
  'han-quoc': 'Hàn Quốc',
  my: 'Mỹ',
  anh: 'Anh',
  nhat: 'Nhật Bản',
};

export default function CountryMovies() {
  const { slug } = useParams<{ slug: string }>();
  const page = usePageQuery();
  const navigate = useNavigate();
  const countrySlug = slug || '';
  const countryName = countryLabels[countrySlug] || countrySlug;

  const { data, isLoading, error, refetch } = useCountryMovies(countrySlug, page);

  useEffect(() => {
    document.title = `${countryName} - CinemaFree`;
  }, [countryName]);

  const handlePageChange = (newPage: number) => {
    navigate(`/quoc-gia/${countrySlug}?page=${newPage}`, { replace: true });
  };

  return (
    <div className="py-8">
      <Seo
        title={countryName}
        description={`Xem phim từ ${countryName} miễn phí chất lượng cao tại CinemaFree.`}
      />
      <MovieList
        title={`Phim ${countryName}`}
        subtitle={`Kho phim ${countryName} mới nhất, cập nhật liên tục`}
        icon={<Globe className="h-5 w-5" />}
        movies={data?.items || []}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
        currentPage={page}
        totalPages={data?.pagination?.totalPages || 1}
        onPageChange={handlePageChange}
        showPagination
        emptyMessage={`Chưa có phim từ ${countryName} nào.`}
      />
    </div>
  );
}
