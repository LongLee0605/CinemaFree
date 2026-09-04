import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  fullScreen?: boolean;
  className?: string;
  text?: string;
}

export function Loading({ fullScreen, className, text }: LoadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        fullScreen ? 'min-h-[60vh]' : 'min-h-[200px]',
        className
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-30 blur-lg" />
        <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
      </div>
      {text && <p className="animate-pulse text-sm font-medium text-muted">{text}</p>}
    </div>
  );
}

export default Loading;
