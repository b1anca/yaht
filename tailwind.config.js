/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        53: "repeat(53, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
