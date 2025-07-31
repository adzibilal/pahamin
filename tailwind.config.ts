import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#D8E710', // Primary lime green
          hover: '#BAC900',    // Primary hover state
        },
        secondary: {
          DEFAULT: '#8A78F2', // Secondary purple
        },
        
        // Grayscale Palette
        gray: {
          0: '#F5F5FA',    // Almost pure white (for cards)
          100: '#ECEDF8',  // Off-white
          200: '#DEEOF3',  // Very light gray with purple undertone
          300: '#B8BBD9',  // Light gray with purple undertone
          400: '#9292B2',  // Medium-light gray with purple undertone
          500: '#353546',  // Medium-dark gray
          600: '#232330',  // Dark gray
          700: '#13121B',  // Very dark gray, almost black
        },
        
        // Semantic colors using the palette
        background: {
          DEFAULT: '#F5F5FA',
          secondary: '#ECEDF8',
        },
        surface: {
          DEFAULT: '#F5F5FA',
          elevated: '#ECEDF8',
        },
        text: {
          primary: '#13121B',
          secondary: '#353546',
          tertiary: '#9292B2',
          inverse: '#F5F5FA',
        },
        border: {
          DEFAULT: '#DEEOF3',
          strong: '#B8BBD9',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        title: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        text: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(19, 18, 27, 0.08)',
        'medium': '0 4px 16px rgba(19, 18, 27, 0.12)',
        'large': '0 8px 32px rgba(19, 18, 27, 0.16)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config; 