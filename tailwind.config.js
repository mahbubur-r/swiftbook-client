/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6", // teal-500
        "background-light": "#ffffff",
        "background-dark": "#111827", // gray-900
      },
      fontFamily: {
        display: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem", // 8px
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
