import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clapperboard, Crown, Baby, Bomb, Ghost, Rocket, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  gradient: string;
  shadow: string;
  icon: React.ElementType;
  description: string;
}

const categories: Category[] = [
  {
    id: 'theaters',
    name: 'Chiếu Rạp',
    slug: '/phim-chieu-rap',
    gradient: 'from-cat-theaters to-cat-theaters-light',
    shadow: 'shadow-blue-900/40',
    icon: Clapperboard,
    description: 'Phim chiếu rạp',
  },
  {
    id: 'period',
    name: 'Cổ Trang',
    slug: '/the-loai/co-trang',
    gradient: 'from-cat-period to-cat-period-light',
    shadow: 'shadow-purple-900/40',
    icon: Crown,
    description: 'Phim cổ trang',
  },
  {
    id: 'animation',
    name: 'Hoạt Hình',
    slug: '/phim-hoat-hinh',
    gradient: 'from-cat-animation to-cat-animation-light',
    shadow: 'shadow-emerald-900/40',
    icon: Baby,
    description: 'Phim hoạt hình',
  },
  {
    id: 'action',
    name: 'Hành Động',
    slug: '/the-loai/hanh-dong',
    gradient: 'from-cat-action to-cat-action-light',
    shadow: 'shadow-violet-900/40',
    icon: Bomb,
    description: 'Phim hành động',
  },
  {
    id: 'horror',
    name: 'Kinh Dị',
    slug: '/the-loai/kinh-di',
    gradient: 'from-cat-horror to-cat-horror-light',
    shadow: 'shadow-orange-900/40',
    icon: Ghost,
    description: 'Phim kinh dị',
  },
  {
    id: 'scifi',
    name: 'Viễn Tưởng',
    slug: '/the-loai/vien-tuong',
    gradient: 'from-cat-scifi to-cat-scifi-light',
    shadow: 'shadow-cyan-900/40',
    icon: Rocket,
    description: 'Viễn tưởng hay',
  },
  {
    id: 'more',
    name: '+53 chủ đề',
    slug: '/phim-moi-cap-nhat',
    gradient: 'from-cat-more to-cat-more-light',
    shadow: 'shadow-gray-900/40',
    icon: Layers,
    description: 'Xem tất cả',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function CategoryCards() {
  return (
    <section className="py-10">
      <div className="container-app">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="section-title">Khám phá thể loại</h2>
            <p className="mt-3 pt-2 text-sm text-muted">Chọn chủ đề yêu thích để bắt đầu</p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:-mx-0 sm:px-0 md:gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={itemVariant}
                className="shrink-0 snap-start overflow-hidden rounded-2xl"
              >
                <Link
                  to={category.slug}
                  className={cn(
                    'group relative flex h-36 w-36 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl active:scale-95 sm:h-40 sm:w-40 md:h-48 md:w-52 md:p-5',
                    category.gradient,
                    category.shadow
                  )}
                >
                  <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/15 transition-all duration-500 group-hover:scale-150 group-hover:bg-white/25" />
                  <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-black/10 transition-all duration-500 group-hover:scale-150" />

                  <div className="relative z-10">
                    <Icon className="h-8 w-8 opacity-90 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-black leading-tight md:text-2xl">
                      {category.name}
                    </h3>
                    <p className="mt-2 flex translate-y-2 items-center gap-1 text-xs font-semibold text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Xem chủ đề{' '}
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(CategoryCards);
export { CategoryCards };
