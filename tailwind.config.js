/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: '#FF6F61', // Bright Orange/Coral
      secondary: '#2C3E50', // Navy Blue
      accent: '#4CAF50', // Green
      background: '#F9F9F9', // Light Gray
      text: '#333333', // Dark Gray
      highlight: '#FFCC00', // Golden Yellow
    },},
  },
  plugins: [],
}

