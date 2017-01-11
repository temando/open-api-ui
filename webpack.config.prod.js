"use strict";

const webpack = require('webpack');

/**
 * Delta production config - must be merged into the main config.
 */
module.exports = () => {
  return {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),

      // WARNING: UglifyJsPlugin disables `devtool: 'source-map'` currently...
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
          unused        : true,
          dead_code     : true,
          warnings      : false,
          drop_debugger : true,
          screw_ie8     : true,
        },
        comments: false,
      }),
    ],
  };
};
