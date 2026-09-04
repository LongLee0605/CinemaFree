import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'default' | 'outline';
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({ children, variant = 'default', className, icon }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/15 text-primary border-primary/30',
    secondary: 'bg-secondary/15 text-secondary border-secondary/30',
    accent: 'bg-accent/15 text-accent border-accent/30',
    default: 'bg-surface-light text-muted border-border',
    outline: 'bg-transparent text-muted border-border-strong',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-sm',
        variants[variant],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
