import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search, X, Sparkles } from 'lucide-react';
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
  const [isFocused, setIsFocused] = useState(false);
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
          'relative flex items-center overflow-hidden rounded-full border bg-surface-elevated/80 transition-all duration-300',
          variant === 'full' ? 'h-14' : 'h-11',
          isFocused
            ? 'border-primary/50 bg-surface-elevated shadow-glow'
            : 'border-border-strong hover:border-border-glow'
        )}
      >
        <div
          className={cn(
            'ml-3 flex shrink-0 items-center justify-center rounded-full transition-all',
            isFocused ? 'text-primary' : 'text-muted',
            variant === 'full' ? 'h-6 w-6' : 'h-5 w-5'
          )}
        >
          <Search className="h-full w-full" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
        {isFocused && !keyword && (
          <div className="mr-3 flex items-center gap-1 text-xs text-muted">
            <Sparkles className="h-3 w-3 text-primary" />
            Enter để tìm
          </div>
        )}
      </div>
    </form>
  );
}
