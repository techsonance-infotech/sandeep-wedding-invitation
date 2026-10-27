/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        cream: 'hsl(var(--cream) / <alpha-value>)',
        'rose-deep': 'hsl(var(--rose-deep) / <alpha-value>)',
        rose: 'hsl(var(--rose) / <alpha-value>)',
        gold: 'hsl(var(--gold) / <alpha-value>)',
        'gold-soft': 'hsl(var(--gold-soft) / <alpha-value>)',
        sage: 'hsl(var(--sage) / <alpha-value>)',
        'sage-deep': 'hsl(var(--sage-deep) / <alpha-value>)',
        'sage-soft': 'hsl(var(--sage-soft) / <alpha-value>)',
        ink: 'hsl(var(--ink) / <alpha-value>)',
      },
      fontFamily: {
        script: ['Great Vibes', 'cursive'],
        'script-capital-a': ['Alex Brush', 'cursive'],
        cinzel: ['Cinzel', 'serif'],
        'serif-display': ['Cormorant Garamond', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        elegant: 'var(--shadow-elegant)',
        gold: 'var(--shadow-gold)',
      },
      keyframes: {
        'envelope-open': {
          '0%': { transform: 'scale(1) rotateX(0)' },
          '50%': { transform: 'scale(1.05) rotateX(-15deg)' },
          '100%': { transform: 'scale(1.4) rotateX(-90deg)', opacity: '0' },
        },
        'float-petal': {
          '0%': { transform: 'translateY(-10vh) translate(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.9' },
          '100%': { transform: 'translateY(110vh) translate(40px) rotate(360deg)', opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(8deg)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'envelope-open': 'envelope-open 1s cubic-bezier(.22, 1, .36, 1) forwards',
        'float-petal': 'float-petal 20s linear infinite',
        drift: 'drift 6s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'fade-up': 'fade-up 1s cubic-bezier(.22, 1, .36, 1) both',
        'fade-in': 'fade-in 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
