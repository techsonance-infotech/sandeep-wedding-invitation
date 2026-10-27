/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFCF7',
          100: '#FAF4E3',
          200: '#F3E5AB',
          300: '#E7D178',
          400: '#DCBD4E',
          500: '#D4AF37', // Antique South Indian Gold
          600: '#B8860B',
          700: '#8C6D1F',
          800: '#664E14',
          900: '#42330A',
        },
        kumkum: {
          50: '#FDF2F4',
          100: '#FCE7EA',
          200: '#F9D0D6',
          300: '#F3A4B0',
          400: '#E46176',
          500: '#C92A45',
          600: '#9B1B30', // Deep auspicious vermilion
          700: '#7A162B',
          800: '#5B0E1D',
          900: '#3D0A14',
        },
        haldi: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FDFCF9',
          200: '#FAF6EE',
          300: '#F5EFE1',
          400: '#EBE1CD',
          500: '#DDD0B7',
        },
        emeraldDeep: {
          800: '#14382c',
          900: '#0c271e',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        script: ['Great Vibes', 'Alex Brush', 'cursive'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #8C6D1F 100%)',
        'royal-gradient': 'linear-gradient(180deg, #3D0A14 0%, #5B0E1D 50%, #3D0A14 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
