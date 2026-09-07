import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  viewMoreLink?: string;
  viewMoreLabel?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  icon,
  viewMoreLink,
  viewMoreLabel = 'Xem tất cả',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 flex items-end justify-between', className)}>
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 text-primary shadow-glow">
            {icon}
          </div>
        )}
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="mt-2 pt-2 text-sm font-medium text-muted">{subtitle}</p>}
        </div>
      </div>

      {viewMoreLink && (
        <Link
          to={viewMoreLink}
          className="group hidden items-center gap-1.5 rounded-full border border-border-strong bg-surface-elevated px-4 py-2 text-sm font-bold text-muted transition-all hover:border-primary/50 hover:text-primary hover:shadow-glow sm:flex"
        >
          {viewMoreLabel}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
