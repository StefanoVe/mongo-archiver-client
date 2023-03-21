/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#30D9A1A0',
        muted: '#e5e7eb',
        'app-dark-mode-color': {
          DEFAULT: '#1A1D1E',
          50: '#6F7C80',
          100: '#667275',
          200: '#535C60',
          300: '#40474A',
          400: '#2D3234',
          500: '#1A1D1E',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
      },
    },
  },

  plugins: [],
};
