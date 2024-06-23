/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["light"], // setting the default theme to light
  },
  theme: {
    extend: {
      backgroundColor: {
        'custom-white': '#ffffff',
      },
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        'input[type=number]': {
          '-moz-appearance': 'textfield',
        },
      });
    },
    require('daisyui'),
    require('tailwindcss-filters')
  ],
}

