const { merge } = require('webpack-merge');
const dotenv = require('dotenv');
const common = require('./webpack.common.js');

const env = dotenv.config().parsed;

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ]
});