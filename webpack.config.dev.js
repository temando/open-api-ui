"use strict";

const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

/**
 * Delta development config - must be merged into the main config.
 */
module.exports = () => {
  return {
    plugins: [
      new DashboardPlugin(),
      new WatchMissingNodeModulesPlugin(`${__dirname}/node_modules`),
    ],

    devtool: 'eval-source-map',

    devServer: {
      contentBase : './client',
      compress: false,
      inline: true,
      port: 8100,
      historyApiFallback: true,

      watchOptions: {
        aggregateTimeout: 100,
      },

      stats: {
        chunkModules: false,
      },
    },

    output: {
      path: './client',
    },
  };
};
