import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchX, Loader2, Search } from 'lucide-react';
import { useSearchMovies } from '@/hooks/useMovies';
import { MovieCard } from '@/components/movies/MovieCard';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { Seo } from '@/components/ui/Seo';
import { GradientText } from '@/components/ui/GradientText';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const {
    data,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useSearchMovies(keyword, 20);

  const isSearching = isFetching && !isFetchingNextPage;

  if (!keyword.trim()) {
    return (
      <div className="container-app py-12">
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-border-strong bg-surface-elevated/50 p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
            <Search className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Bạn muốn tìm phim gì?</h2>
          <p className="mt-2 text-muted">Nhập tên phim, diễn viên hoặc thể loại để bắt đầu.</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container-app py-12">
        <ErrorFallback
          title="Tìm kiếm thất bại"
          message={error?.message}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const items = data?.pages.flatMap((page) => page.data?.items || []) || [];
  const totalItems = data?.pages[0]?.data?.params?.pagination?.totalItems || 0;

  return (
    <div className="container-app py-8">
      <Seo
        title={`Tìm kiếm: ${keyword}`}
        description={`Kết quả tìm kiếm phim ${keyword} trên CinemaFree`}
      />

      <SectionHeader
        title={
          <>
            Kết quả cho: <GradientText>{keyword}</GradientText>
          </>
        }
        subtitle={isSearching ? 'Đang tìm kiếm...' : `Tìm thấy ${totalItems} kết quả`}
        icon={<Search className="h-5 w-5" />}
      />

      {isSearching && items.length === 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="aspect-poster animate-pulse rounded-2xl bg-surface-elevated"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-border-strong bg-surface-elevated/50 p-8 text-center">
          <SearchX className="mx-auto mb-4 h-12 w-12 text-muted" />
          <h2 className="text-xl font-bold text-foreground">Không tìm thấy kết quả</h2>
          <p className="mt-2 text-muted">
            Không tìm thấy phim nào cho từ khóa &quot;{keyword}&quot;. Vui lòng thử từ khóa khác.
          </p>
        </div>
      ) : (
        <>
          {isSearching && (
            <div className="mb-4 flex items-center gap-2 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang cập nhật kết quả...
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {items.map((movie, index) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>

          {hasNextPage && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="btn-primary"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Đang tải...
                  </>
                ) : (
                  'Tải thêm kết quả'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
