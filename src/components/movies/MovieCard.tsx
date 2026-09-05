import { memo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { Image } from '@/components/ui/Image';
import { getImageUrl } from '@/utils/imageUrl';
import { queryClient } from '@/lib/queryClient';
import { getMovieDetail } from '@/services/movieApi';
import { movieKeys } from '@/hooks/useMovies';

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'carousel' | 'search';
  className?: string;
}

function MovieCard({ movie, variant = 'default', className }: MovieCardProps) {
  const imageUrl = getImageUrl(movie.poster_url || movie.thumb_url);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || variant !== 'default') return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
  };

  if (variant === 'search') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'group flex flex-col gap-4 rounded-2xl border border-border bg-surface-elevated p-4 shadow-card transition-all hover:border-border-strong hover:shadow-card-hover sm:flex-row',
          className
        )}
      >
        <Link to={`/movie/${movie.slug}`} className="shrink-0">
          <div className="relative w-full overflow-hidden rounded-xl sm:w-36">
            <Image
              src={imageUrl}
              alt={movie.name}
              aspectRatio="poster"
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full bg-gradient-to-br from-primary to-primary-hover p-2 text-black shadow-glow">
                <Play className="h-5 w-5 fill-current" />
              </div>
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-2">
          <Link to={`/movie/${movie.slug}`}>
            <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
              {movie.name}
            </h3>
          </Link>
          <p className="text-sm text-muted">
            {movie.origin_name} {movie.year && `(${movie.year})`}
          </p>

          <div className="flex flex-wrap gap-2">
            {movie.quality && (
              <span className="badge-pill border-primary/30 bg-primary/15 text-primary">
                <Star className="h-3 w-3" />
                {movie.quality}
              </span>
            )}
            {movie.year && (
              <span className="badge-pill border-border bg-surface-light text-muted">
                {movie.year}
              </span>
            )}
            {movie.time && (
              <span className="badge-pill border-border-strong text-muted">{movie.time}</span>
            )}
          </div>

          {movie.category && movie.category.length > 0 && (
            <p className="text-sm text-muted">{movie.category.map((c) => c.name).join(' • ')}</p>
          )}
        </div>
      </motion.div>
    );
  }

  const prefetchMovieDetail = () => {
    queryClient.prefetchQuery({
      queryKey: movieKeys.detail(movie.slug),
      queryFn: () => getMovieDetail(movie.slug),
      staleTime: 10 * 60 * 1000,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      transition={{ duration: 0.2 }}
      className={cn('group will-change-transform', className)}
    >
      <Link
        to={`/movie/${movie.slug}`}
        className="block"
        onMouseEnter={prefetchMovieDetail}
        onFocus={prefetchMovieDetail}
      >
        <div className="glow-border shine relative overflow-hidden rounded-2xl bg-surface-elevated shadow-card transition-all duration-300 group-hover:shadow-card-hover">
          <div className="aspect-poster relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={movie.name}
              className="transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="rounded-full bg-gradient-to-br from-primary to-primary-hover p-4 text-black shadow-glow-xl"
              >
                <Play className="h-7 w-7 fill-current" />
              </motion.div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white/15 p-3 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white/25">
                  <Info className="h-5 w-5" />
                </span>
              </div>
            </div>

            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {movie.quality && (
                <span className="badge-pill border-primary/30 bg-primary/15 text-primary shadow-glow">
                  <Star className="h-3 w-3" />
                  {movie.quality}
                </span>
              )}
              {movie.episode_current && (
                <span className="badge-pill border-accent/30 bg-accent/15 text-accent shadow-glow-accent">
                  {movie.episode_current}
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <p className="truncate text-xs font-semibold text-white/90">
                {movie.time || movie.lang || movie.year}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <h3
              className={cn(
                'line-clamp-2 min-h-[2.5em] font-black leading-tight text-foreground transition-colors group-hover:text-primary',
                variant === 'carousel' ? 'text-sm' : 'text-[15px]'
              )}
              title={movie.name}
            >
              {movie.name}
            </h3>
            <p className="truncate text-xs text-muted" title={movie.origin_name || ''}>
              {movie.origin_name || movie.episode_current || ''}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default memo(MovieCard);
export { MovieCard };
