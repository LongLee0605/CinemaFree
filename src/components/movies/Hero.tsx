import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Play,
  Heart,
  Info,
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { getImageUrl } from '@/utils/imageUrl';
import { stripHtml, truncateText } from '@/utils/html';

interface HeroProps {
  items: Movie[];
}

const typeLabels: Record<string, string> = {
  'phim-le': 'Phim Lẻ',
  'phim-bo': 'Phim Bộ',
  'hoat-hinh': 'Hoạt Hình',
  'tv-shows': 'TV Shows',
  single_movies: 'Phim Lẻ',
  series: 'Phim Bộ',
  cartoon: 'Hoạt Hình',
  tvshows: 'TV Shows',
};

function Hero({ items }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [items.length, isPaused, nextSlide]);

  if (items.length === 0) return null;

  const movie = items[currentIndex];
  const imageUrl = getImageUrl(movie.poster_url || movie.thumb_url);
  const typeLabel =
    typeLabels[movie.type || ''] || (movie.type === 'series' ? 'Phim Bộ' : 'Phim Lẻ');
  const genres =
    movie.category
      ?.map((c) => c.name)
      .slice(0, 3)
      .join(' • ') || '';

  return (
    <section
      ref={containerRef}
      className="relative h-[420px] w-full overflow-hidden sm:h-[480px] md:h-[620px] lg:h-[720px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={movie._id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <motion.img
            src={imageUrl}
            alt={movie.name}
            className="h-full w-full object-cover"
            style={{ y, scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-hero-bottom" />
          <div className="hero-vignette absolute inset-0" />

          {/* Animated gradient orbs */}
          <div className="absolute left-1/4 top-1/3 h-96 w-96 animate-pulse-glow rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 animate-pulse-glow rounded-full bg-secondary/10 blur-[100px]" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-end">
        <div className="container-app pb-20 md:pb-28">
          <motion.div
            key={`info-${movie._id}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="badge-gradient">
                <Sparkles className="h-3.5 w-3.5" /> Nổi bật
              </span>
              <span className="badge-pill border-primary/30 bg-primary/15 text-primary">
                <Star className="h-3.5 w-3.5" /> IMDb 7.5
              </span>
              <span className="badge-pill border-border bg-surface-elevated/90 text-white">
                {typeLabel}
              </span>
              {movie.year && (
                <span className="badge-pill border-border-strong bg-surface-elevated/70 text-muted">
                  <Calendar className="h-3.5 w-3.5" />
                  {movie.year}
                </span>
              )}
              {movie.time && (
                <span className="badge-pill border-border-strong bg-surface-elevated/70 text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {movie.time}
                </span>
              )}
            </div>

            <h1 className="mb-2 text-2xl font-black leading-tight text-white sm:mb-3 sm:text-3xl md:text-5xl lg:text-6xl">
              <span className="gradient-text-animated">{movie.name}</span>
            </h1>
            <p className="mb-3 text-sm text-white/80 sm:text-base md:text-lg lg:text-xl">
              {movie.origin_name}
            </p>

            {genres && (
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-primary sm:text-sm md:text-base">
                {genres}
              </p>
            )}

            <p className="mb-6 line-clamp-2 max-w-xl text-xs leading-relaxed text-gray-300 sm:text-sm md:text-base lg:line-clamp-3">
              {truncateText(stripHtml(movie.content), 160) ||
                `Xem phim ${movie.name} chất lượng cao, miễn phí tại CinemaFree.`}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to={`/movie/${movie.slug}`} className="btn-circle-lg group">
                <Play className="h-7 w-7 fill-current transition-transform group-hover:scale-110" />
              </Link>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  'btn-circle',
                  isLiked && 'border-accent/50 text-accent hover:border-accent hover:text-accent'
                )}
                aria-label={isLiked ? 'Bỏ yêu thích' : 'Yêu thích'}
              >
                <Heart className={cn('h-5 w-5', isLiked && 'fill-accent')} />
              </button>

              <Link to={`/movie/${movie.slug}`} className="btn-circle" aria-label="Thông tin phim">
                <Info className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {items.length > 1 && (
        <div className="absolute bottom-8 right-4 z-20 hidden md:right-8 lg:block">
          <div className="flex items-center gap-3">
            {items.slice(0, 5).map((item, index) => (
              <button
                key={item._id}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'group relative h-16 w-28 overflow-hidden rounded-xl border-2 transition-all duration-300 md:h-20 md:w-40',
                  currentIndex === index
                    ? 'border-primary shadow-glow-lg'
                    : 'border-transparent opacity-60 hover:opacity-100'
                )}
                aria-label={`Xem ${item.name}`}
              >
                <img
                  src={getImageUrl(item.thumb_url || item.poster_url)}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/20" />
                {currentIndex === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Side Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-border-strong bg-black/50 p-3 text-white backdrop-blur-md transition-all hover:border-primary/50 hover:bg-black/70 hover:text-primary lg:left-8 lg:flex"
            aria-label="Slide trước"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-border-strong bg-black/50 p-3 text-white backdrop-blur-md transition-all hover:border-primary/50 hover:bg-black/70 hover:text-primary lg:right-8 lg:flex"
            aria-label="Slide sau"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Mobile Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:hidden">
          {items.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                currentIndex === index
                  ? 'w-8 bg-gradient-to-r from-primary to-secondary'
                  : 'w-2.5 bg-white/40'
              )}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

export default memo(Hero);
export { Hero };
