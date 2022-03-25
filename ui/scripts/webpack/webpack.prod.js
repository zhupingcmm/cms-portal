const { merge } = require("webpack-merge");
const webpack = require("webpack");
const dotenv = require("dotenv");
const common = require("./webpack.common.js");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin(envKeys),
    // new BundleAnalyzerPlugin()
  ],
});
