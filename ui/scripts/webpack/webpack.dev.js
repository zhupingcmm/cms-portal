const webpack = require('webpack');
const {merge} = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const common = require('./webpack.common.js');

const tsLoader = common.module.rules.find((r) => r.loader === 'ts-loader');
if (tsLoader) {
  tsLoader.options = {
    ...tsLoader.options,
    getCustomTransformers: () => ({
      before: [ReactRefreshTypeScript()],
    }),
    transpileOnly: true,
  };
}

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      port: 3002,
      open: true,
      client: {
        overlay: {
          warnings: false,
        },
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    ],
  });