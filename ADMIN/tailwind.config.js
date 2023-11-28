/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'DeepGreen': '#1F6E3C',
        'LightGrey': '#F5F5F5',
        'DarkGrey': '#1F1F1F',
        'Gold': '#FFD700',
        'CharcoalGrey': '#4C4C4C'
      },
      height: {
        '128': '535px',
        '144': '680px',
      },
      width: {
        '100': '420px'
      }
    },
  },
  plugins: [],
}