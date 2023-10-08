/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        54: "repeat(54, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
