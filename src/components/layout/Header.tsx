import { useState, isValidElement, cloneElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Film, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GradientText } from '@/components/ui/GradientText';

const navItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Phim mới', path: '/phim-moi-cap-nhat' },
  { label: 'Phim lẻ', path: '/phim-le' },
  { label: 'Phim bộ', path: '/phim-bo' },
  { label: 'Hoạt hình', path: '/phim-hoat-hinh' },
  { label: 'TV Shows', path: '/tv-shows' },
];

interface HeaderProps {
  searchComponent?: React.ReactNode;
}

export function Header({ searchComponent }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50">
      {/* Glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container-app">
          <div className="flex h-18 items-center justify-between gap-4">
            <Link
              to="/"
              className="group flex items-center gap-2.5 transition-transform hover:scale-105"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-black shadow-glow">
                <Film className="h-5 w-5" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-50 blur-lg transition-opacity group-hover:opacity-80" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Cinema<GradientText className="font-black">Free</GradientText>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                    isActive(item.path)
                      ? 'text-black'
                      : 'text-muted hover:bg-surface-elevated hover:text-foreground'
                  )}
                >
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-hover shadow-glow"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="hidden max-w-md flex-1 lg:block">{searchWithClose}</div>

            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/search"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-muted transition-all hover:border-primary/50 hover:text-primary"
                aria-label="Tìm kiếm"
              >
                <Search className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-muted transition-all hover:border-primary/50 hover:text-primary"
                aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-border/50 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <nav className="container-app flex flex-col gap-2 py-5">
              {searchWithClose && <div className="mb-2 lg:hidden">{searchWithClose}</div>}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'rounded-xl px-4 py-3 text-sm font-medium transition-all',
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary'
                      : 'text-muted hover:bg-surface-elevated hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
