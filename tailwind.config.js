/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        53: "repeat(53, minmax(0, 1fr))",
      },
    },
    fontSize: {
      xm: "0.8rem",
    },
  },
  plugins: [],
};
