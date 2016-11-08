var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  name: 'browser',
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8100',
    path.join(__dirname, 'src/client/app/index.js')
  ],
  output: {
    path: APP_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: APP_DIR,
    devtool: 'eval',
    inline: true,
    port: 8100,
    outputPath: APP_DIR,
    historyApiFallback: true
  },
  resolve: {
    modulesDirectories: ['src/shared/', 'node_modules'],
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],
  module : {
    loaders : [
      {
        test : /\.js?/,
        exclude : /node_modules/,
        loader : 'babel'
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap', {
          allChunks: true
        })
      },
      {
        test: /\.(ttf|eot|svg|png|gif|jpg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      }
    ]
  },
  node: {
    fs: 'empty',
    child_process: 'empty',
    readline: 'empty'
  }
};

module.exports = config;