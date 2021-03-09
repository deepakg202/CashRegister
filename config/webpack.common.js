const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const glob = require('glob');

const constants = require('./constants');


const baseRegEx = new RegExp(`${constants.PAGES_DIR}/`);
const files = glob.sync(`/**/*.pug`, {root: constants.PAGES_DIR}).map((fp => {
  const parsePath = path.parse(fp.replace(baseRegEx,''))
  return {
    template: fp,
    filename: path.join(parsePath.dir, parsePath.name +'.html')
  }
}))


module.exports = {

    plugins: [
        new CleanWebpackPlugin(),
        
        ...files.map((fileConfig) => new HtmlWebpackPlugin({...fileConfig})),
        
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: constants.PUBLIC_DIR,
                  noErrorOnMissing: true
                }
            ]
        }),
        new ESLintPlugin()
      ],
    output: {
        filename: 'js/[name].bundle.js',
        path: constants.OUTPUT_DIR
    },

    resolve: {
      alias: {
        // Unused 
        // Layouts: constants.LAYOUTS_DIR,
        // Components: constants.COMPONENTS_DIR,
        // Pages: constants.PAGES_DIR
      },
    },

    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.pug$/,
            use: {
                loader: 'pug-loader',
                options: {root: constants.SRC_DIR}
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ],
        }, ]
    },
};
