const path = require("path");

module.exports = {
  mode: "development",
  bundle: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "eval-source-map",
};
