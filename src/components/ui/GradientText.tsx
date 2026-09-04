import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gold' | 'cyan' | 'mixed';
}

export function GradientText({ children, className, variant = 'mixed' }: GradientTextProps) {
  const gradients = {
    gold: 'from-primary via-primary-hover to-orange-400',
    cyan: 'from-secondary via-secondary-hover to-blue-500',
    mixed: 'from-primary via-primary-hover to-secondary',
  };

  return (
    <span
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradients[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
