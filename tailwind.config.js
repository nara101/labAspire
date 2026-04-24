/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8b4513',
        secondary: '#5a2d0c',
        accent: '#d2a679'
      }
    }
  },
  plugins: []
}
