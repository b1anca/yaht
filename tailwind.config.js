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
      "2xs": "0.6875rem",
      xs: "0.75rem",
      sm: "0.8rem",
      base: "0.875rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.815rem",
      "7xl": "4.768rem",
      "8xl": "5.96rem",
      "9xl": "7.451rem",
      "10xl": "9.313rem",
    },
  },
  plugins: [],
};
