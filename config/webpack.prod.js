const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const constants = require('./constants')

module.exports = merge(common, {
  mode: 'production',
  plugins: [new PurgeCssPlugin({
    paths: glob.sync(`${constants.OUTPUT_DIR}/**/*`,  { nodir: true }),
  })]
});
