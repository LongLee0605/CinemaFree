import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'poster' | 'video' | 'square' | 'auto';
}

export function Image({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = 'auto',
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClasses = {
    poster: 'aspect-poster',
    video: 'aspect-video',
    square: 'aspect-square',
    auto: '',
  };

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-surface-elevated text-muted',
          aspectClasses[aspectRatio],
          containerClassName
        )}
      >
        <span className="text-sm">{alt || 'Không có hình ảnh'}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface-elevated',
        aspectClasses[aspectRatio],
        containerClassName
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'h-full w-full object-cover transition-all duration-500',
          isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
          className
        )}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      )}
    </div>
  );
}
