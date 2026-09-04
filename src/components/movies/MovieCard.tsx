import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Clock, Globe, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { Image } from '@/components/ui/Image';
import { Badge } from '@/components/ui/Badge';
import { getImageUrl } from '@/utils/imageUrl';

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'carousel' | 'search';
  className?: string;
}

export function MovieCard({ movie, variant = 'default', className }: MovieCardProps) {
  const imageUrl = getImageUrl(movie.poster_url || movie.thumb_url);

  if (variant === 'search') {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'group flex flex-col gap-4 rounded-2xl border border-border bg-surface-elevated/80 p-4 shadow-card transition-all duration-300 hover:border-border-strong hover:shadow-card-hover sm:flex-row',
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full bg-primary/90 p-2 text-black">
                <Play className="h-5 w-5 fill-current" />
              </div>
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-2">
          <Link to={`/movie/${movie.slug}`}>
            <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {movie.name}
            </h3>
          </Link>
          <p className="text-sm text-muted">
            {movie.origin_name} {movie.year && `(${movie.year})`}
          </p>

          <div className="flex flex-wrap gap-2">
            {movie.quality && <Badge variant="primary">{movie.quality}</Badge>}
            {movie.year && (
              <Badge variant="default" icon={<Calendar className="h-3 w-3" />}>
                {movie.year}
              </Badge>
            )}
            {movie.time && (
              <Badge variant="outline" icon={<Clock className="h-3 w-3" />}>
                {movie.time}
              </Badge>
            )}
            {movie.lang && (
              <Badge variant="outline" icon={<Globe className="h-3 w-3" />}>
                {movie.lang}
              </Badge>
            )}
          </div>

          {movie.category && movie.category.length > 0 && (
            <p className="text-sm text-muted">
              Thể loại: {movie.category.map((c) => c.name).join(', ')}
            </p>
          )}

          {movie.country && movie.country.length > 0 && (
            <p className="text-sm text-muted">
              Quốc gia: {movie.country.map((c) => c.name).join(', ')}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn('group', className)}
    >
      <Link to={`/movie/${movie.slug}`} className="block">
        <div className="glow-border shine relative overflow-hidden rounded-2xl bg-surface-elevated shadow-card transition-all duration-300 group-hover:border-border-strong group-hover:shadow-card-hover">
          <div className="aspect-poster relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={movie.name}
              className="transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="rounded-full bg-gradient-to-r from-primary to-primary-hover p-3 text-black shadow-glow-lg"
              >
                <Play className="h-6 w-6 fill-current" />
              </motion.div>
            </div>

            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {movie.quality && (
                <Badge variant="primary" icon={<Star className="h-3 w-3" />}>
                  {movie.quality}
                </Badge>
              )}
              {movie.year && <Badge variant="default">{movie.year}</Badge>}
            </div>

            {movie.episode_current && (
              <div className="absolute bottom-3 right-3">
                <Badge variant="accent">{movie.episode_current}</Badge>
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-12">
              <p className="truncate text-xs font-medium text-white/90">
                {movie.time || movie.lang}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 p-3">
            <h3
              className={cn(
                'font-bold leading-tight text-foreground transition-colors group-hover:text-primary',
                variant === 'carousel' ? 'text-sm' : 'text-[15px]'
              )}
            >
              {movie.name}
            </h3>
            <p className="truncate text-xs text-muted">
              {movie.origin_name || movie.episode_current || ''}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
