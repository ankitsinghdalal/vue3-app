/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius : {
        large: '4rem'
      },
      fontFamily: {
        sans: ['Proxima Nova', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
}

