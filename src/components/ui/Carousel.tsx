import { useEffect, useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { MovieCard } from '@/components/movies/MovieCard';

interface CarouselProps {
  items: Movie[];
  title?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  visibleItems?: number;
  className?: string;
}

function Carousel({
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
      {title && <h2 className="section-title mb-8">{title}</h2>}

      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          className="flex will-change-transform"
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
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border-strong bg-background/95 p-3 text-foreground shadow-card backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary hover:shadow-glow"
              aria-label="Trang trước"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border-strong bg-background/95 p-3 text-foreground shadow-card backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary hover:shadow-glow"
              aria-label="Trang sau"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {items.length > itemsPerSlide && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                currentIndex === index
                  ? 'w-8 bg-gradient-to-r from-primary to-secondary'
                  : 'w-2.5 bg-border-strong hover:bg-muted'
              )}
              aria-label={`Đến slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(Carousel);
export { Carousel };
