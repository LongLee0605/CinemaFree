import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0f0f11',
        'surface-elevated': '#16161a',
        'surface-light': '#1e1e24',
        border: '#2a2a32',
        'border-strong': '#3f3f4a',
        primary: '#f5c518',
        'primary-hover': '#ffdb4d',
        'primary-glow': 'rgba(245, 197, 24, 0.4)',
        secondary: '#00d4ff',
        'secondary-hover': '#33ddff',
        'secondary-glow': 'rgba(0, 212, 255, 0.4)',
        accent: '#ff2d55',
        'accent-hover': '#ff5c7c',
        'accent-glow': 'rgba(255, 45, 85, 0.4)',
        muted: '#a1a1aa',
        'muted-foreground': '#71717a',
        foreground: '#fafafa',
      },
      spacing: {
        18: '4.5rem',
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
        glow: '0 0 20px rgba(245, 197, 24, 0.15)',
        'glow-lg': '0 0 40px rgba(245, 197, 24, 0.25)',
        'glow-secondary': '0 0 20px rgba(0, 212, 255, 0.15)',
        'glow-accent': '0 0 20px rgba(255, 45, 85, 0.15)',
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(245, 197, 24, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        shimmer: 'shimmer 2.5s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
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
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #f5c518 0%, #ff8c00 50%, #f5c518 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
        'gradient-hero':
          'linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.8) 60%, rgba(5,5,5,1) 100%)',
        'gradient-card':
          'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
