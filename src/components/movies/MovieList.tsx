import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types/movie';
import { MovieCard } from './MovieCard';
import { Pagination } from '@/components/ui/Pagination';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { MovieListSkeleton } from '@/components/ui/Skeleton';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface MovieListProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
  viewMoreLink?: string;
  viewMoreLabel?: string;
  emptyMessage?: string;
  className?: string;
  gridClassName?: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function MovieList({
  title,
  movies,
  isLoading,
  error,
  onRetry,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPagination = true,
  viewMoreLink,
  viewMoreLabel = 'Xem tất cả',
  emptyMessage = 'Chưa có phim nào.',
  className,
  gridClassName,
  icon,
  subtitle,
}: MovieListProps) {
  if (isLoading) {
    return (
      <section className={cn('py-8', className)}>
        <div className="container-app">
          <SectionHeader title={title} icon={icon} subtitle={subtitle} />
          <MovieListSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={cn('py-8', className)}>
        <div className="container-app">
          <SectionHeader title={title} icon={icon} subtitle={subtitle} />
          <ErrorFallback
            title="Không thể tải danh sách phim"
            message={error.message}
            onRetry={onRetry}
          />
        </div>
      </section>
    );
  }

  if (movies.length === 0) {
    return (
      <section className={cn('py-8', className)}>
        <div className="container-app">
          <SectionHeader title={title} icon={icon} subtitle={subtitle} />
          <div className="rounded-2xl border border-border-strong bg-surface-elevated/50 p-8 text-center text-muted">
            {emptyMessage}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-8', className)}>
      <div className="container-app">
        <SectionHeader
          title={title}
          icon={icon}
          subtitle={subtitle}
          viewMoreLink={viewMoreLink}
          viewMoreLabel={viewMoreLabel}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className={cn(
            'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
            gridClassName
          )}
        >
          {movies.map((movie) => (
            <motion.div key={movie._id} variants={itemVariants}>
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>

        {showPagination && onPageChange && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </section>
  );
}
