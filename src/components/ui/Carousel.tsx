import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { MovieCard } from '@/components/movies/MovieCard';
import { Badge } from '@/components/ui/Badge';
import { getImageUrl } from '@/utils/imageUrl';

interface CarouselProps {
  items: Movie[];
  title?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  visibleItems?: number;
  className?: string;
}

export function Carousel({
  items,
  title,
  autoPlay = false,
  autoPlayInterval = 5000,
  visibleItems = 5,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(visibleItems);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerSlide(2);
      else if (window.innerWidth < 768) setItemsPerSlide(3);
      else if (window.innerWidth < 1024) setItemsPerSlide(4);
      else if (window.innerWidth < 1280) setItemsPerSlide(5);
      else setItemsPerSlide(visibleItems);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [visibleItems]);

  const maxIndex = Math.max(0, items.length - itemsPerSlide);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!autoPlay || items.length <= itemsPerSlide || isHovered) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, itemsPerSlide, nextSlide, isHovered]);

  if (items.length === 0) return null;

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title && <h2 className="section-title mb-6">{title}</h2>}

      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * (100 / itemsPerSlide)}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {items.map((item) => (
            <div
              key={item._id}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / itemsPerSlide}%` }}
            >
              <MovieCard movie={item} variant="carousel" />
            </div>
          ))}
        </motion.div>

        {items.length > itemsPerSlide && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border-strong bg-background/90 p-3 text-foreground shadow-card backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary hover:shadow-glow"
              aria-label="Trang trước"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border-strong bg-background/90 p-3 text-foreground shadow-card backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary hover:shadow-glow"
              aria-label="Trang sau"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {items.length > itemsPerSlide && (
        <div className="mt-5 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                currentIndex === index
                  ? 'w-8 bg-gradient-to-r from-primary to-secondary'
                  : 'w-2 bg-border-strong hover:bg-muted'
              )}
              aria-label={`Đến slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface HeroCarouselProps {
  items: Movie[];
  className?: string;
}

export function HeroCarousel({ items, className }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [items.length, isHovered]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];
  const imageUrl = getImageUrl(currentItem.poster_url || currentItem.thumb_url);

  return (
    <div
      className={cn(
        'relative h-[420px] w-full overflow-hidden rounded-3xl md:h-[520px] lg:h-[600px]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem._id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img src={imageUrl} alt={currentItem.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-hero" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-end">
        <div className="container-app pb-10 md:pb-16">
          <motion.div
            key={`info-${currentItem._id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="primary" icon={<Star className="h-3 w-3" />}>
                Nổi bật
              </Badge>
              {currentItem.quality && <Badge variant="accent">{currentItem.quality}</Badge>}
              {currentItem.year && (
                <Badge variant="default" icon={<Calendar className="h-3 w-3" />}>
                  {currentItem.year}
                </Badge>
              )}
              {currentItem.episode_current && (
                <Badge variant="outline">{currentItem.episode_current}</Badge>
              )}
            </div>

            <h2 className="mb-3 text-3xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              {currentItem.name}
            </h2>

            <p className="mb-4 text-lg text-white/80 md:text-xl">{currentItem.origin_name}</p>

            <p className="mb-6 line-clamp-2 max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
              {currentItem.category?.map((c) => c.name).join(' • ')}
              {currentItem.category && currentItem.category.length > 0 && currentItem.time && ' • '}
              {currentItem.time}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to={`/movie/${currentItem.slug}`} className="btn-primary">
                <Play className="h-5 w-5 fill-current" />
                Xem ngay
              </Link>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
                className="btn-secondary"
              >
                Phim tiếp theo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-6 right-6 flex gap-2 md:bottom-10 md:right-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                currentIndex === index
                  ? 'w-8 bg-gradient-to-r from-primary to-secondary'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {items.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
            className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border-strong bg-background/80 p-3 text-foreground shadow-card backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary md:flex"
            aria-label="Slide trước"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border-strong bg-background/80 p-3 text-foreground shadow-card backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary md:flex"
            aria-label="Slide sau"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
