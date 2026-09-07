import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#030303',
        surface: '#08080a',
        'surface-elevated': '#0f0f12',
        'surface-light': '#18181d',
        border: '#27272e',
        'border-strong': '#3f3f4a',
        'border-glow': '#5b5b6b',
        primary: '#f5c518',
        'primary-hover': '#ffdb4d',
        'primary-glow': 'rgba(245, 197, 24, 0.5)',
        secondary: '#00f0ff',
        'secondary-hover': '#33f3ff',
        'secondary-glow': 'rgba(0, 240, 255, 0.5)',
        accent: '#ff2d55',
        'accent-hover': '#ff5c7c',
        'accent-glow': 'rgba(255, 45, 85, 0.5)',
        muted: '#9ca3af',
        'muted-foreground': '#6b7280',
        foreground: '#fafafa',
        // Category card colors (vibrant gradients)
        'cat-theaters': '#1e40af',
        'cat-theaters-light': '#3b82f6',
        'cat-period': '#6b21a8',
        'cat-period-light': '#a855f7',
        'cat-animation': '#059669',
        'cat-animation-light': '#34d399',
        'cat-action': '#7c3aed',
        'cat-action-light': '#a78bfa',
        'cat-horror': '#ea580c',
        'cat-horror-light': '#fb923c',
        'cat-anime': '#be123c',
        'cat-anime-light': '#fb7185',
        'cat-scifi': '#0e7490',
        'cat-scifi-light': '#22d3ee',
        'cat-more': '#374151',
        'cat-more-light': '#6b7280',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        4.5: '1.125rem',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        glow: '0 0 20px rgba(245, 197, 24, 0.2)',
        'glow-lg': '0 0 40px rgba(245, 197, 24, 0.35)',
        'glow-xl': '0 0 80px rgba(245, 197, 24, 0.25)',
        'glow-secondary': '0 0 20px rgba(0, 240, 255, 0.2)',
        'glow-secondary-lg': '0 0 40px rgba(0, 240, 255, 0.35)',
        'glow-accent': '0 0 20px rgba(255, 45, 85, 0.2)',
        'glow-accent-lg': '0 0 40px rgba(255, 45, 85, 0.35)',
        card: '0 8px 40px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 24px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(245, 197, 24, 0.15)',
        'card-glow-secondary': '0 24px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 240, 255, 0.15)',
        'hero-vignette': 'inset 0 -160px 160px -60px rgba(0,0,0,0.95)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        shimmer: 'shimmer 2.5s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'text-shimmer': 'textShimmer 3s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #f5c518 0%, #ff8c00 50%, #f5c518 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #00f0ff 0%, #0099cc 100%)',
        'gradient-mixed': 'linear-gradient(135deg, #f5c518 0%, #ff2d55 50%, #00f0ff 100%)',
        'gradient-hero':
          'linear-gradient(90deg, rgba(3,3,3,0.98) 0%, rgba(3,3,3,0.85) 35%, rgba(3,3,3,0.4) 70%, rgba(3,3,3,0.1) 100%)',
        'gradient-hero-bottom':
          'linear-gradient(180deg, rgba(3,3,3,0) 0%, rgba(3,3,3,0.5) 60%, rgba(3,3,3,1) 100%)',
        'gradient-card':
          'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
