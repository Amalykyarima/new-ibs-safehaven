/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#B91C1C',
          light: '#3B82F6',
          dark: '#1E40AF'
        }
      }
    }
  },
  plugins: [],
};
