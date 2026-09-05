import { useQueries } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sparkles, Clapperboard, Tv, Baby, Flame, Play, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  useLatestMovies,
  useCategoryMovies,
  movieKeys,
  getMoviesByCategory,
} from '@/hooks/useMovies';
import type { MovieCategory } from '@/types/movie';
import { Hero } from '@/components/movies/Hero';
import { CategoryCards } from '@/components/movies/CategoryCards';
import { Carousel } from '@/components/ui/Carousel';
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
    <section className="py-12">
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

  const heroItems = latestData?.items?.slice(0, 5) || [];
  const latestItems = latestData?.items?.slice(0, 8) || [];

  return (
    <div className="relative overflow-hidden">
      <Seo
        title="Trang chủ"
        description="CinemaFree - Xem phim miễn phí chất lượng cao, phim mới cập nhật liên tục."
      />

      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] animate-pulse-glow rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute -right-40 top-1/2 h-[400px] w-[400px] animate-pulse-glow rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 h-[300px] w-[300px] animate-pulse-glow rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <div className="relative -mt-18">
          <Hero items={heroItems} />
        </div>
        <CategoryCards />

        <section className="py-12">
          <div className="container-app">
            <SectionHeader
              title="Phim mới cập nhật"
              subtitle="Những bộ phim hot nhất vừa được cập nhật"
              icon={<Sparkles className="h-5 w-5" />}
              viewMoreLink="/phim-moi-cap-nhat"
              viewMoreLabel="Xem tất cả"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            >
              {latestItems.map((movie, index) => (
                <motion.div
                  key={movie._id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="container-app">
          <div className="h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        </div>

        <CategorySection
          title="Phim lẻ đặc sắc"
          subtitle="Tuyển chọn phim lẻ hay nhất"
          icon={Clapperboard}
          category="phim-le"
        />

        <div className="container-app">
          <div className="h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        </div>

        <CategorySection
          title="Phim bộ hot"
          subtitle="Series phim dài tập hấp dẫn"
          icon={Tv}
          category="phim-bo"
        />

        <div className="container-app">
          <div className="h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        </div>

        <CategorySection
          title="Hoạt hình mới"
          subtitle="Phim hoạt hình cho mọi lứa tuổi"
          icon={Baby}
          category="hoat-hinh"
        />

        <div className="container-app">
          <div className="h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
        </div>

        <CategorySection
          title="TV Shows"
          subtitle="Chương trình truyền hình đa dạng"
          icon={Tv}
          category="tv-shows"
        />

        <section className="py-20">
          <div className="container-app">
            <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface-elevated/60 p-10 shadow-card md:p-16">
              <div className="absolute -right-24 -top-24 h-72 w-72 animate-pulse-glow rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 animate-pulse-glow rounded-full bg-secondary/15 blur-3xl" />
              <div className="bg-grid absolute inset-0 opacity-50" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-black shadow-glow-lg">
                  <Zap className="h-8 w-8" />
                </div>
                <h2 className="mb-4 text-3xl font-black text-foreground md:text-5xl">
                  Khám phá kho phim <span className="gradient-text-animated">khổng lồ</span>
                </h2>
                <p className="mb-8 max-w-2xl text-lg text-muted">
                  Hàng nghìn bộ phim, TV shows, hoạt hình đa dạng thể loại. Hoàn toàn miễn phí, chất
                  lượng cao.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
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
    </div>
  );
}
