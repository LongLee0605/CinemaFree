import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-surface-elevated', className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-poster w-full rounded-2xl" />
      <Skeleton className="h-4 w-3/4 rounded-lg" />
      <Skeleton className="h-3 w-1/2 rounded-lg" />
    </div>
  );
}

export function MovieListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <Skeleton className="aspect-poster w-full rounded-3xl lg:w-80" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-10 w-2/3 rounded-xl" />
          <Skeleton className="h-6 w-1/3 rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  );
}
