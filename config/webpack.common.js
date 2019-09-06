const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const helpers = require('./helpers');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

module.exports = {
  entry: {
    js: ['babel-polyfill', helpers.root('client/src/index.js')],
    vendor: ['react']
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'bundle.[chunkhash].js',
  },

  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.html'],
    alias: {
      'src': 'client/src'
    }
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      // JS files
      {
        test: /\.jsx?$/,
        include: helpers.root('client'),
        loader: ['babel-loader?retainLines=true']
      },

      // SCSS files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                'sourceMap': true,
                'importLoaders': 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer
                ]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new CompressionPlugin(),

    new BundleAnalyzerPlugin(),
    
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('client/public/index.html'),
      inject: 'body'
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: !isProd
    }),

    new CopyWebpackPlugin([{
      from: helpers.root('client/public')
    }])
  ]
};
