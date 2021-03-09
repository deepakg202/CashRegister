const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const constants = require("./constants");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: constants.PUBLIC_DIR,
    port: constants.PORT,
    inline: true,
    compress: true
  },
});
