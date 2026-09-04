import { Film, Heart } from 'lucide-react';
import { GradientText } from '@/components/ui/GradientText';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-surface/70 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container-app py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-black">
              <Film className="h-4 w-4" />
            </div>
            <span className="text-lg font-black tracking-tight">
              Cinema<GradientText className="font-black">Free</GradientText>
            </span>
          </div>

          <p className="flex items-center gap-1.5 text-sm text-muted">
            Built with <Heart className="h-4 w-4 fill-accent text-accent" /> by Le Tran Dang Long
          </p>

          <div className="flex items-center gap-3 text-sm text-muted">
            <span>© {currentYear} CinemaFree. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
