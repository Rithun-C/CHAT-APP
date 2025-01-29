// @type {import('tailwindcss').Config} 
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        primary : "#04a784",
        primaryDense :"#008069",
        backgroung : "#eff2f5"
      }
    },
  },
  plugins: [],
}

