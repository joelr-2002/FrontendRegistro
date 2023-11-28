/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/components/utils/*.{js,jsx,ts,tsx}",
    "./src/styles/*.{css,scss,sass,less,styl}",
  ],
  theme: {
    extend: {
      animation: {
        'animate-bounce': 'bounce 4s infinite',
      },
    },
  },
  plugins: [],
}