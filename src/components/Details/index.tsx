import { useParams } from 'react-router-dom';
import { useMovieDetail } from '@/hooks/useMovies';
import { MovieDetail } from '@/components/movies/MovieDetail';
import { Seo } from '@/components/ui/Seo';

export default function MovieDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError, error, refetch } = useMovieDetail(slug || '');

  const movieName = data?.movie?.name || 'Chi tiết phim';

  return (
    <div>
      <Seo
        title={movieName}
        description={
          data?.movie?.content || `Xem phim ${movieName} miễn phí chất lượng cao trên CinemaFree.`
        }
      />
      <MovieDetail
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
      />
    </div>
  );
}
