import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorFallback({
  title = 'Không thể tải dữ liệu',
  message = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
  onRetry,
  className,
}: ErrorFallbackProps) {
  return (
    <div
      className={cn(
        'flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-border-strong bg-surface-elevated/60 p-8 text-center backdrop-blur-sm',
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-primary/20 text-primary shadow-glow-accent">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h3 className="mb-2 text-lg font-black text-foreground">{title}</h3>
      <p className="mb-6 max-w-md text-sm text-muted">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary">
          <RefreshCw className="h-4 w-4" />
          Thử lại
        </button>
      )}
    </div>
  );
}
