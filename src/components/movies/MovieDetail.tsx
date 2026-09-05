import { useState, useMemo, memo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Play,
  Calendar,
  Clock,
  Globe,
  Film,
  Users,
  User,
  Tag,
  Monitor,
  AlertTriangle,
  Star,
  Heart,
  Share2,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MovieDetailResponse, EpisodeServerData } from '@/types/movie';
import { Image } from '@/components/ui/Image';
import { Badge } from '@/components/ui/Badge';
import { getImageUrl } from '@/utils/imageUrl';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { DetailSkeleton } from '@/components/ui/Skeleton';
import { formatDateTimeVN } from '@/utils/dateUtils';
import { getLastWatchedEpisode, saveLastWatchedEpisode } from '@/utils/playback';

interface MovieDetailProps {
  data?: MovieDetailResponse;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

const tabs = [
  { id: 'watch', label: 'Xem phim', icon: Play },
  { id: 'info', label: 'Thông tin', icon: Film },
  { id: 'content', label: 'Nội dung', icon: Tag },
];

function MovieDetail({ data, isLoading, isError, error, onRetry }: MovieDetailProps) {
  const [activeTab, setActiveTab] = useState('watch');
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeServerData | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const watchRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  const movie = data?.movie;
  const episodes = useMemo(() => data?.episodes || [], [data?.episodes]);

  const currentServer = useMemo(
    () => episodes[selectedServerIndex],
    [episodes, selectedServerIndex]
  );
  const serverData = useMemo(() => currentServer?.server_data || [], [currentServer]);

  const getEmbedUrl = useCallback((url: string) => {
    try {
      const embedUrl = new URL(url);
      embedUrl.searchParams.set('autoplay', '1');
      return embedUrl.toString();
    } catch {
      return `${url}${url.includes('?') ? '&' : '?'}autoplay=1`;
    }
  }, []);

  const selectedEmbedUrl = useMemo(() => {
    let url: string | null = null;
    if (selectedEpisode) url = selectedEpisode.link_embed;
    else if (serverData.length === 1) url = serverData[0].link_embed;
    return url ? getEmbedUrl(url) : null;
  }, [selectedEpisode, serverData, getEmbedUrl]);

  const selectEpisode = useCallback(
    (ep: EpisodeServerData, serverIndex = selectedServerIndex) => {
      setSelectedEpisode(ep);
      if (movie) {
        saveLastWatchedEpisode(movie.slug, ep.slug, serverIndex);
      }
    },
    [movie, selectedServerIndex]
  );

  const scrollToWatch = useCallback(() => {
    if (!watchRef.current) return;
    const headerOffset = 80;
    const top = watchRef.current.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const playMovie = useCallback(() => {
    if (!movie || serverData.length === 0) return;

    const lastWatched = getLastWatchedEpisode(movie.slug);
    if (lastWatched && episodes[lastWatched.serverIndex]) {
      setSelectedServerIndex(lastWatched.serverIndex);
      const ep = episodes[lastWatched.serverIndex].server_data.find(
        (e) => e.slug === lastWatched.episodeSlug
      );
      if (ep) {
        setSelectedEpisode(ep);
      } else {
        setSelectedEpisode(episodes[lastWatched.serverIndex].server_data[0] || null);
      }
    } else {
      setSelectedServerIndex(0);
      selectEpisode(serverData[0], 0);
    }

    setActiveTab('watch');
    setTimeout(() => scrollToWatch(), 50);
  }, [movie, serverData, episodes, scrollToWatch, selectEpisode]);

  const genres = useMemo(
    () => movie?.category?.map((c) => c.name).join(' • ') || '',
    [movie?.category]
  );

  if (isLoading) {
    return (
      <div className="container-app py-8">
        <DetailSkeleton />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="container-app py-12">
        <ErrorFallback
          title="Không tìm thấy phim"
          message={error?.message || 'Không thể tải thông tin phim.'}
          onRetry={onRetry}
        />
      </div>
    );
  }

  const posterUrl = getImageUrl(movie.poster_url || movie.thumb_url);
  const thumbUrl = getImageUrl(movie.thumb_url || movie.poster_url);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-0 top-1/4 h-[400px] w-[400px] animate-pulse-glow rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute right-0 top-1/3 h-[350px] w-[350px] animate-pulse-glow rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      {/* Cinematic Hero Background */}
      <div className="relative h-[380px] w-full overflow-hidden md:h-[480px] lg:h-[560px]">
        <div className="absolute inset-0">
          <motion.img
            src={thumbUrl}
            alt={movie.name}
            className="h-full w-full object-cover"
            style={{ y: heroY, scale: 1.1 }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-hero-bottom" />
        <div className="hero-vignette absolute inset-0" />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-app relative z-10 -mt-44 md:-mt-60 lg:-mt-72">
        {/* Top: Poster + Info */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          {/* Poster */}
          <div className="mx-auto w-64 shrink-0 lg:mx-0 lg:w-80">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl shadow-2xl"
              style={{ perspective: '1000px' }}
            >
              <div className="glow-border relative">
                <Image src={posterUrl} alt={movie.name} aspectRatio="poster" className="w-full" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <button
                type="button"
                onClick={playMovie}
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-label="Xem phim"
              >
                <div className="btn-circle-lg group">
                  <Play className="h-7 w-7 fill-current transition-transform group-hover:scale-110" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Main Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="badge-gradient">
                <Sparkles className="h-3.5 w-3.5" /> Nổi bật
              </span>
              {movie.quality && (
                <Badge variant="primary" icon={<Star className="h-3.5 w-3.5" />}>
                  {movie.quality}
                </Badge>
              )}
              {movie.year && (
                <Badge variant="default" icon={<Calendar className="h-3.5 w-3.5" />}>
                  {movie.year}
                </Badge>
              )}
              {movie.episode_current && <Badge variant="accent">{movie.episode_current}</Badge>}
              {movie.category?.[0] && <Badge variant="outline">{movie.category[0].name}</Badge>}
            </div>

            <h1 className="mb-3 text-3xl font-black leading-tight text-foreground md:text-4xl lg:text-5xl">
              <span className="gradient-text-animated">{movie.name}</span>
            </h1>
            <p className="mb-5 text-lg text-muted md:text-xl">{movie.origin_name}</p>

            {genres && (
              <p className="mb-5 text-sm font-bold uppercase tracking-wider text-primary md:text-base">
                {genres}
              </p>
            )}

            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted">
              {movie.time && (
                <span className="flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-elevated/70 px-3 py-1.5">
                  <Clock className="h-4 w-4 text-secondary" />
                  {movie.time}
                </span>
              )}
              {movie.lang && (
                <span className="flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-elevated/70 px-3 py-1.5">
                  <Globe className="h-4 w-4 text-secondary" />
                  {movie.lang}
                </span>
              )}
              {movie.status && (
                <span className="flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-elevated/70 px-3 py-1.5">
                  <Film className="h-4 w-4 text-secondary" />
                  {movie.status}
                </span>
              )}
            </div>

            <div className="mb-10 flex flex-wrap gap-3">
              <button onClick={playMovie} className="btn-primary">
                <Play className="h-5 w-5 fill-current" />
                Xem phim
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  'btn-secondary',
                  isLiked && 'border-accent/50 text-accent hover:shadow-glow-accent'
                )}
              >
                <Heart className={cn('h-5 w-5', isLiked && 'fill-accent')} />
                {isLiked ? 'Đã thích' : 'Yêu thích'}
              </button>
              <button className="btn-secondary">
                <Share2 className="h-5 w-5" />
                Chia sẻ
              </button>
            </div>
          </motion.div>
        </div>

        {/* Watch Section: full width, centered */}
        <div ref={watchRef} className="mt-10 lg:mt-14">
          {/* Tabs */}
          <div className="mb-8 border-b border-border">
            <div className="flex gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'relative flex items-center gap-2 rounded-t-xl px-5 py-3.5 text-sm font-bold transition-colors',
                      activeTab === tab.id ? 'text-foreground' : 'text-muted hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mx-auto max-w-5xl">
            <AnimatePresence mode="wait">
              {activeTab === 'watch' && (
                <motion.div
                  key="watch"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {selectedEmbedUrl ? (
                    <div className="glow-border overflow-hidden rounded-2xl border border-border bg-black shadow-2xl">
                      <div className="relative aspect-video w-full">
                        <iframe
                          src={selectedEmbedUrl}
                          title={movie.name}
                          className="absolute inset-0 h-full w-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          loading="eager"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex aspect-video flex-col items-center justify-center rounded-2xl border border-border-strong bg-surface-elevated/50 text-center">
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                        <Play className="h-10 w-10 text-primary" />
                      </div>
                      <p className="text-lg font-bold text-foreground">Chọn tập để xem phim</p>
                      <p className="text-sm text-muted">
                        Vui lòng chọn server và tập phim bên dưới
                      </p>
                    </div>
                  )}

                  {episodes.length > 1 && (
                    <div className="space-y-3">
                      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted">
                        <Monitor className="h-4 w-4 text-secondary" />
                        Chọn server
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {episodes.map((server, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedServerIndex(index);
                              setSelectedEpisode(null);
                            }}
                            className={cn(
                              'rounded-xl px-4 py-2.5 text-sm font-bold transition-all',
                              selectedServerIndex === index
                                ? 'bg-gradient-to-r from-primary to-primary-hover text-black shadow-glow'
                                : 'border border-border bg-surface-elevated text-muted hover:border-border-strong hover:text-foreground'
                            )}
                          >
                            {server.server_name || `Server ${index + 1}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {serverData.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted">
                        <Film className="h-4 w-4 text-secondary" />
                        Chọn tập
                      </h3>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                        {serverData.map((ep, index) => (
                          <button
                            key={ep.slug || index}
                            onClick={() => selectEpisode(ep)}
                            className={cn(
                              'rounded-xl px-3 py-2.5 text-sm font-bold transition-all',
                              selectedEpisode?.slug === ep.slug
                                ? 'bg-gradient-to-r from-primary to-primary-hover text-black shadow-glow'
                                : 'border border-border bg-surface-elevated text-muted hover:border-border-strong hover:text-foreground'
                            )}
                          >
                            {ep.name || `Tập ${index + 1}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {serverData.length === 0 && (
                    <div className="flex items-center gap-3 rounded-2xl border border-border-strong bg-surface-elevated/50 p-4 text-muted">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      <span>Phim này hiện chưa có link xem.</span>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <InfoItem icon={Film} label="Tình trạng" value={movie.status} />
                  <InfoItem icon={Clock} label="Thời lượng" value={movie.time} />
                  <InfoItem icon={Globe} label="Ngôn ngữ" value={movie.lang} />
                  <InfoItem icon={Calendar} label="Năm sản xuất" value={movie.year?.toString()} />
                  <InfoItem
                    icon={Users}
                    label="Diễn viên"
                    value={movie.actor?.join(', ')}
                    fullWidth
                  />
                  <InfoItem
                    icon={User}
                    label="Đạo diễn"
                    value={movie.director?.join(', ')}
                    fullWidth
                  />
                  <InfoItem
                    icon={Tag}
                    label="Thể loại"
                    value={movie.category?.map((c) => c.name).join(', ')}
                    fullWidth
                  />
                  <InfoItem
                    icon={Globe}
                    label="Quốc gia"
                    value={movie.country?.map((c) => c.name).join(', ')}
                    fullWidth
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Ngày cập nhật"
                    value={formatDateTimeVN(movie.modified?.time)}
                    fullWidth
                  />
                </motion.div>
              )}

              {activeTab === 'content' && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="rounded-2xl border border-border-strong bg-surface-elevated/50 p-6">
                    <div
                      className="movie-content leading-relaxed text-foreground"
                      dangerouslySetInnerHTML={{
                        __html: movie.content || '<p>Chưa có nội dung cho phim này.</p>',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value?: string;
  fullWidth?: boolean;
}

function InfoItem({ icon: Icon, label, value, fullWidth }: InfoItemProps) {
  if (!value) return null;

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl border border-border bg-surface-elevated/50 p-4 transition-all hover:border-border-strong',
        fullWidth && 'sm:col-span-2'
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default memo(MovieDetail);
export { MovieDetail };
