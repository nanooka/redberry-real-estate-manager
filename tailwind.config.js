/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fira: ["FiraGO", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-outer-spin-button': {
          "-webkit-appearance": "none",
          margin: 0,
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          "-webkit-appearance": "none",
          margin: 0,
        },
        'input[type="number"]': {
          "-moz-appearance": "textfield",
        },
      });
    },
  ],
};
