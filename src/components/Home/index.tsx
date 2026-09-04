import { useQueries } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Clapperboard,
  Tv,
  Baby,
  TrendingUp,
  Flame,
  Play,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLatestMovies, useCategoryMovies, movieKeys } from '@/hooks/useMovies';
import { getMoviesByCategory } from '@/services/movieApi';
import type { MovieCategory } from '@/types/movie';
import { HeroCarousel, Carousel } from '@/components/ui/Carousel';
import { MovieCard } from '@/components/movies/MovieCard';
import { MovieListSkeleton } from '@/components/ui/Skeleton';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { Seo } from '@/components/ui/Seo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Loading } from '@/components/Loading';

interface CategorySectionProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  category: MovieCategory;
}

function CategorySection({ title, subtitle, icon: Icon, category }: CategorySectionProps) {
  const { data, isLoading, error, refetch } = useCategoryMovies(category, 1);

  return (
    <section className="py-10">
      <div className="container-app">
        {isLoading ? (
          <>
            <SectionHeader title={title} subtitle={subtitle} icon={<Icon className="h-5 w-5" />} />
            <MovieListSkeleton count={6} />
          </>
        ) : error ? (
          <>
            <SectionHeader title={title} subtitle={subtitle} icon={<Icon className="h-5 w-5" />} />
            <ErrorFallback
              title="Không thể tải"
              message={error.message}
              onRetry={() => refetch()}
            />
          </>
        ) : (
          <Carousel items={data?.items || []} title={title} autoPlay />
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const {
    data: latestData,
    isLoading: isLatestLoading,
    error: latestError,
    refetch: refetchLatest,
  } = useLatestMovies(1);

  useQueries({
    queries: [
      {
        queryKey: movieKeys.category('phim-le', 1),
        queryFn: () => getMoviesByCategory('phim-le', 1),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: movieKeys.category('phim-bo', 1),
        queryFn: () => getMoviesByCategory('phim-bo', 1),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: movieKeys.category('hoat-hinh', 1),
        queryFn: () => getMoviesByCategory('hoat-hinh', 1),
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: movieKeys.category('tv-shows', 1),
        queryFn: () => getMoviesByCategory('tv-shows', 1),
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  if (isLatestLoading) {
    return <Loading fullScreen text="Đang tải phim mới nhất..." />;
  }

  if (latestError) {
    return (
      <div className="container-app py-12">
        <ErrorFallback
          title="Không thể tải trang chủ"
          message={latestError.message}
          onRetry={() => refetchLatest()}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Seo
        title="Trang chủ"
        description="CinemaFree - Xem phim miễn phí chất lượng cao, phim mới cập nhật liên tục."
      />

      {/* Hero Banner */}
      <section className="relative pt-6">
        <div className="container-app">
          <HeroCarousel items={latestData?.items?.slice(0, 5) || []} />
        </div>
      </section>

      {/* Latest Movies Section */}
      <section className="py-10">
        <div className="container-app">
          <SectionHeader
            title="Phim mới cập nhật"
            subtitle="Những bộ phim hot nhất vừa được cập nhật"
            icon={<Sparkles className="h-5 w-5" />}
            viewMoreLink="/phim-moi-cap-nhat"
            viewMoreLabel="Xem tất cả"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {latestData?.items?.slice(0, 12).map((movie, index) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Sections */}
      <CategorySection
        title="Phim lẻ đặc sắc"
        subtitle="Tuyển chọn phim lẻ hay nhất"
        icon={Clapperboard}
        category="phim-le"
      />
      <CategorySection
        title="Phim bộ hot"
        subtitle="Series phim dài tập hấp dẫn"
        icon={Tv}
        category="phim-bo"
      />
      <CategorySection
        title="Hoạt hình mới"
        subtitle="Phim hoạt hình cho mọi lứa tuổi"
        icon={Baby}
        category="hoat-hinh"
      />
      <CategorySection
        title="TV Shows"
        subtitle="Chương trình truyền hình đa dạng"
        icon={Tv}
        category="tv-shows"
      />

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-app">
          <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface-elevated/50 p-8 md:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-black shadow-glow">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">
                Khám phá kho phim <span className="gradient-text">khổng lồ</span>
              </h2>
              <p className="mb-6 max-w-xl text-muted">
                Hàng nghìn bộ phim, TV shows, hoạt hình đa dạng thể loại. Hoàn toàn miễn phí, chất
                lượng cao.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/phim-moi-cap-nhat" className="btn-primary">
                  <Flame className="h-5 w-5" />
                  Phim mới hot
                </Link>
                <Link to="/phim-le" className="btn-secondary">
                  <Play className="h-5 w-5" />
                  Khám phá ngay
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
