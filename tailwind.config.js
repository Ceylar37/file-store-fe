/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'rel-lg': '35vw',
      },
      backgroundColor: {
        'main-dark': '#1e1e1e',
        cornflowerblue: 'rgb(100, 149, 237)',
        cornflower: 'rgb(100, 149, 237)',
        'dark-cornflowerblue': 'rgb(81,122,189)',
      },
    },
  },
  plugins: [],
};
