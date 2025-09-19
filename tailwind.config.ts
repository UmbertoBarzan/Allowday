import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        allow: {
          background: '#f5f7fb',
          surface: '#ffffff',
          card: '#f1f5ff',
          primary: '#5c6ac4',
          accent: '#f59eb7',
          success: '#4fb286',
          warning: '#f7c948',
          danger: '#f97068',
        },
      },
      boxShadow: {
        soft: '0 18px 45px rgba(92,106,196,0.12)',
      },
      borderRadius: {
        xl: '18px',
      },
    },
  },
  plugins: [],
};

export default config;
