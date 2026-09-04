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
      <section className={cn('py-6', className)}>
        <div className="container-app">
          <SectionHeader title={title} icon={icon} subtitle={subtitle} />
          <MovieListSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={cn('py-6', className)}>
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
      <section className={cn('py-6', className)}>
        <div className="container-app">
          <SectionHeader title={title} icon={icon} subtitle={subtitle} />
          <div className="rounded-2xl border border-border bg-surface-elevated/50 p-8 text-center text-muted">
            {emptyMessage}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-6', className)}>
      <div className="container-app">
        <SectionHeader
          title={title}
          icon={icon}
          subtitle={subtitle}
          viewMoreLink={viewMoreLink}
          viewMoreLabel={viewMoreLabel}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
            gridClassName
          )}
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
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
