"use strict";

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// The <script_name> in `npm run <script_name>`
const INVOCATION = process.env.npm_lifecycle_event;
const DEVELOPMENT = INVOCATION === 'start' || INVOCATION === 'dash';
const PRODUCTION = process.env.NODE_ENV === 'production';

const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');
const pkgJson = require('./package.json');

/**
 * webpack.config.js
 *
 * This constructs/merges a webpack config.
 * - Webpack will call this function
 * - Checks `INVOCATION` to determine whether to run development or production builds
 *
 */
module.exports = () => {
  let config = {
    context: `${__dirname}/src/client`,

    entry: {
      bundle: [
        './app/index.js'
      ],

      // Everything in the `dependencies` should be considered a `vendor` library
      vendor: [].concat(Object.keys(pkgJson.dependencies)),
    },

    output: {
      path       : `${__dirname}/dist`,
      filename   : '[name].[chunkhash].js',
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
      }),

      /**
       * This renders out an `./dist/index.html` with all scripts, title etc. attached
       */
      new HtmlWebpackPlugin({
        title    : pkgJson.description || pkgJson.name,
        filename : 'index.html',
        template : './app/index.html',
      }),

      new ExtractTextWebpackPlugin({
        filename: '[name].[chunkhash].css'
      }),
    ],

    resolve: {
      modules: ['src/shared/', 'node_modules'],
      extensions: ['.js', '.jsx', '.json']
    },

    performance: { hints: false },

    module: {
      rules: [
        // JS
        {
          test    : /\.jsx?$/,
          use     : ['babel-loader'],
          exclude : [/node_modules/],

          // ESLINT - ADD BACK WHEN PROJECT HAS ESLINT
          // rules: [
          //   {
          //     enforce : 'pre',
          //     use     : [{
          //       loader  : 'eslint-loader',
          //       options : {
          //         cache : true,
          //         quiet : true,

          //         // Causes `npm run build` to fail on lint errors
          //         // but development does not
          //         emitWarning: DEVELOPMENT,
          //       },
          //     }],
          //   },
          // ],
        },

        // SASS
        {
          test : /\.s[ac]ss$/,
          exclude: /node_modules/,
          loader: ExtractTextWebpackPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: [
              {
                loader  : 'css-loader',
                options : { sourceMap: DEVELOPMENT },
              },
              {
                loader  : 'sass-loader',
                options : { sourceMap: DEVELOPMENT },
              },
            ],
          })
        },

        // ASSETS
        {
          test : /\.(png|jpg|gif|woff|woff2|eot|svg)$/,
          use  : [
            { loader: 'url-loader', options: { limit: 8192 } },
          ],
        },
      ],
    },
  };

  if (DEVELOPMENT) {
    config = webpackMerge(config, devConfig());
  } else if (PRODUCTION) {
    config = webpackMerge(config, prodConfig());
  }

  // console.log(JSON.stringify(config, 2, 2));

  return config;
};
