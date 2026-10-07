/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: '#0A1C3E',
            50: '#F4F7FC',
            100: '#E6EDF8',
            200: '#C7D7F1',
            800: '#0F2B5B',
            900: '#0A1C3E', // Logo ORIGINTRA Deep Navy
            950: '#050E20',
          },
          blue: {
            DEFAULT: '#0070E0', // Logo Wave Blue
            50: '#EFF6FF',
            100: '#DBEAFE',
            600: '#0070E0',
            700: '#0058B6',
          },
          amber: {
            DEFAULT: '#D97706',
            50: '#FFFBEB',
            500: '#F59E0B',
            600: '#D97706',
          }
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['DM Sans', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['DM Sans', 'Space Grotesk', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      boxShadow: {
        'clean': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'clean-hover': '0 10px 25px -5px rgba(10, 28, 62, 0.07)',
      }
    },
  },
  plugins: [],
}
