/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require("tailwindcss")("./src/tailwind.config.js"),
    require("autoprefixer"),
  ],
}
