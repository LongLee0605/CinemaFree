import { Film, Heart, Github, Twitter, Facebook, Instagram } from 'lucide-react';
import { GradientText } from '@/components/ui/GradientText';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-border/50 bg-surface/70 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container-app py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-black shadow-glow">
              <Film className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Cinema<GradientText className="font-black">Free</GradientText>
            </span>
          </div>

          <p className="flex items-center gap-1.5 text-sm text-muted">
            Built with <Heart className="h-4 w-4 fill-accent text-accent" /> by Le Tran Dang Long
          </p>

          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Github].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface-elevated text-muted transition-all hover:border-primary/50 hover:text-primary hover:shadow-glow"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-8 text-center text-xs font-medium text-muted-foreground">
          © {currentYear} CinemaFree. All rights reserved. Xem phim miễn phí chất lượng cao.
        </div>
      </div>
    </footer>
  );
}
