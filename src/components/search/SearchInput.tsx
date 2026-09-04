import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  className?: string;
  variant?: 'header' | 'full';
  placeholder?: string;
  autoFocus?: boolean;
  onSearch?: () => void;
}

export function SearchInput({
  className,
  variant = 'header',
  placeholder = 'Tìm kiếm phim, diễn viên...',
  autoFocus = false,
  onSearch,
}: SearchInputProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const urlKeyword = searchParams.get('keyword') || '';
  const isSearchPage = location.pathname === '/search';

  const [keyword, setKeyword] = useState(urlKeyword);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setKeyword(urlKeyword);
  }, [urlKeyword]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const submitSearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (trimmed) {
        navigate(`/search?keyword=${encodeURIComponent(trimmed)}`);
        onSearch?.();
      }
    },
    [navigate, onSearch]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearch(keyword);
  };

  const handleClear = () => {
    setKeyword('');
    inputRef.current?.focus();
    if (isSearchPage && urlKeyword) {
      navigate('/');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div
        className={cn(
          'relative flex items-center overflow-hidden rounded-2xl border border-border bg-surface-elevated/80 transition-all duration-300 focus-within:border-primary/50 focus-within:bg-surface-elevated focus-within:shadow-glow',
          variant === 'full' ? 'h-14' : 'h-11'
        )}
      >
        <button
          type="submit"
          className={cn(
            'ml-3 shrink-0 text-muted transition-colors hover:text-primary',
            variant === 'full' ? 'h-5 w-5' : 'h-4 w-4'
          )}
          aria-label="Tìm kiếm"
        >
          <Search className="h-full w-full" />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full bg-transparent px-3 text-foreground placeholder:text-muted-foreground focus:outline-none',
            variant === 'full' ? 'text-base' : 'text-sm'
          )}
        />
        {keyword && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-2 rounded-full p-1.5 text-muted transition-all hover:bg-surface-light hover:text-foreground"
            aria-label="Xóa tìm kiếm"
          >
            <X className={cn('h-4 w-4', variant === 'full' && 'h-5 w-5')} />
          </button>
        )}
      </div>
    </form>
  );
}
