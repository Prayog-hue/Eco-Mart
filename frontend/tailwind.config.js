/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "rabbit-red": "#ea2e0e"
      },
      animation: {
        'color-change': 'colorChange 8s infinite', 
        'letter-color': 'letterColor 9s infinite',
      },
      keyframes: {
        colorChange: {
          '0%': { color: '#10b981' }, // green-500
          '25%': { color: '#3b82f6' }, // blue-500
          '50%': { color: '#10b981' }, // green-500
          '75%': { color: '#8b5cf6' }, // purple-500
          '100%': { color: '#10b981' }, // green
   
        },
        letterColor: {
        '0%': { color: '#00000' }, // White
          '50%': { color: '#c6280c' }, // rabbit-red
          '100%': { color: '#000000' }, // Back to white
        },
      },
    },
  },
  plugins: [],
};