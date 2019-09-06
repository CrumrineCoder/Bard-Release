const webpack = require('webpack');
const merge = require('webpack-merge');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  mode: 'development',

  entry: {
    'app': [
      'webpack-hot-middleware/client?reload=true'
    ]
  },

  output: {
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new BundleAnalyzerPlugin()
  ],

  devServer: {
    contentBase: './client/public',
    historyApiFallback: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  }
});
