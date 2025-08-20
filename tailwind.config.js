/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FABC00",
          dark: "#0c4a6e",
          accent: "#f59e0b"
        }
      },
      fontFamily: {
        sans: ['Inter','"Plus Jakarta Sans"','"Noto Sans TC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"','Inter','ui-sans-serif','system-ui']
      },
      boxShadow: {
        soft: "0 10px 25px -8px rgba(2,6,23,0.15)"
      }
    },
  },
  plugins: [],
}
