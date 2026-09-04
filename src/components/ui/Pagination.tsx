import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 py-10" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-elevated transition-all',
          currentPage === 1
            ? 'cursor-not-allowed text-muted-foreground'
            : 'text-foreground hover:border-primary/50 hover:text-primary hover:shadow-glow'
        )}
        aria-label="Trang trước"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {getPageNumbers().map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-muted">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-bold transition-all',
              currentPage === page
                ? 'border-transparent bg-gradient-to-r from-primary to-primary-hover text-black shadow-glow'
                : 'border-border bg-surface-elevated text-foreground hover:border-primary/50 hover:text-primary hover:shadow-glow'
            )}
            aria-label={`Trang ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-elevated transition-all',
          currentPage === totalPages
            ? 'cursor-not-allowed text-muted-foreground'
            : 'text-foreground hover:border-primary/50 hover:text-primary hover:shadow-glow'
        )}
        aria-label="Trang sau"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}
