/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main-color": "#87CEEB"
      },
      backgroundImage: {
        'hero-bg': "url('/src/assets/hero-bg.png')",

      }
    },
  },
  plugins: [],
}
