import { useState, isValidElement, cloneElement, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Tv, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GradientText } from '@/components/ui/GradientText';

interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string; slug?: string }[];
}

const navItems: NavItem[] = [
  { label: 'Chủ Đề', path: '/phim-moi-cap-nhat' },
  {
    label: 'Thể loại',
    children: [
      { label: 'Hành động', path: '/the-loai/hanh-dong', slug: 'hanh-dong' },
      { label: 'Kinh dị', path: '/the-loai/kinh-di', slug: 'kinh-di' },
      { label: 'Hoạt hình', path: '/the-loai/hoat-hinh', slug: 'hoat-hinh' },
      { label: 'Cổ trang', path: '/the-loai/co-trang', slug: 'co-trang' },
      { label: 'Tâm lý', path: '/the-loai/tam-ly', slug: 'tam-ly' },
      { label: 'Hình sự', path: '/the-loai/hinh-su', slug: 'hinh-su' },
    ],
  },
  { label: 'Phim Lẻ', path: '/phim-le' },
  { label: 'Phim Bộ', path: '/phim-bo' },
  {
    label: 'Quốc gia',
    children: [
      { label: 'Việt Nam', path: '/quoc-gia/viet-nam', slug: 'viet-nam' },
      { label: 'Trung Quốc', path: '/quoc-gia/trung-quoc', slug: 'trung-quoc' },
      { label: 'Hàn Quốc', path: '/quoc-gia/han-quoc', slug: 'han-quoc' },
      { label: 'Mỹ', path: '/quoc-gia/my', slug: 'my' },
    ],
  },
  {
    label: 'Năm',
    children: [
      { label: '2025', path: '/nam/2025', slug: '2025' },
      { label: '2024', path: '/nam/2024', slug: '2024' },
      { label: '2023', path: '/nam/2023', slug: '2023' },
      { label: '2022', path: '/nam/2022', slug: '2022' },
    ],
  },
];

interface HeaderProps {
  searchComponent?: React.ReactNode;
}

function Header({ searchComponent }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSections, setOpenMobileSections] = useState<Record<string, boolean>>({
    'Thể loại': true,
    'Quốc gia': false,
    Năm: false,
  });
  const location = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const searchWithClose =
    searchComponent && isValidElement(searchComponent)
      ? cloneElement(searchComponent, { onSearch: closeMobileMenu } as Record<string, unknown>)
      : searchComponent;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleMobileSection = (label: string) => {
    setOpenMobileSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleMobileLinkClick = () => {
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

      <div className="border-b border-border/40 bg-background/75 backdrop-blur-2xl">
        <div className="container-fluid">
          <div className="flex h-18 items-center justify-between gap-4 py-2">
            {/* Logo */}
            <Link
              to="/"
              className="group flex shrink-0 items-center gap-2.5 transition-transform hover:scale-105"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25">
                <Tv className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black shadow-glow">
                  ★
                </span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Cinema<GradientText className="font-black">Free</GradientText>
              </span>
            </Link>

            {/* Search - desktop */}
            <div className="hidden max-w-2xl flex-1 px-6 lg:block">{searchWithClose}</div>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 xl:flex">
              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={cn(
                        'relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-all',
                        openDropdown === item.label
                          ? 'bg-surface-elevated text-foreground'
                          : 'text-muted hover:text-foreground'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform',
                          openDropdown === item.label && 'rotate-180'
                        )}
                      />
                      {openDropdown === item.label && (
                        <motion.div
                          layoutId="navGlow"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-border-strong bg-surface-elevated/95 py-2 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                        >
                          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary via-secondary to-accent" />
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.path}
                              className="group flex items-center gap-2 px-4 py-2.5 text-sm text-muted transition-all hover:bg-surface-light hover:text-primary"
                            >
                              <Sparkles className="h-3.5 w-3.5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path || '/'}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-semibold transition-all',
                      isActive(item.path || '')
                        ? 'text-foreground'
                        : 'text-muted hover:text-foreground'
                    )}
                  >
                    {isActive(item.path || '') && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )
              )}
            </nav>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-muted transition-all hover:border-primary/50 hover:text-primary"
                aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-border/40 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="container-fluid flex flex-col gap-2 py-5">
              {searchWithClose && <div className="mb-2">{searchWithClose}</div>}

              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="overflow-hidden rounded-2xl border border-border-strong bg-surface-elevated/50"
                  >
                    <button
                      onClick={() => toggleMobileSection(item.label)}
                      className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-surface-light"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted transition-transform duration-200',
                          openMobileSections[item.label] && 'rotate-180'
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openMobileSections[item.label] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-2 px-3 pb-3">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.path}
                                onClick={handleMobileLinkClick}
                                className={cn(
                                  'rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                                  isActive(child.path)
                                    ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary'
                                    : 'text-muted hover:bg-surface-light hover:text-foreground'
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path || '/phim-moi-cap-nhat'}
                    onClick={handleMobileLinkClick}
                    className={cn(
                      'rounded-xl px-4 py-3 text-sm font-bold transition-all',
                      isActive(item.path || '')
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary'
                        : 'text-muted hover:bg-surface-elevated hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default memo(Header);
export { Header };
