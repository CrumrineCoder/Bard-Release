const webpack = require('webpack');
const merge = require('webpack-merge');
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  mode: 'development',

  entry: {
    js: ['babel-polyfill', helpers.root('client/src/index.js')],
    vendor: ['react'],
    'app': [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    ]
  },
  
  plugins: [new webpack.HotModuleReplacementPlugin()],

  output: {
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  },

  watchOptions: {
    aggregateTimeout: 10000,
    poll: 5000
  },
/*
  plugins: [
    new BundleAnalyzerPlugin()
  ],
*/
  devServer: {
    contentBase: './client/public',
    historyApiFallback: true,
    stats: 'minimal', // none (or false), errors-only, minimal, normal (or true) and verbose,
    hot: true
  }
});
