const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const dotenv = require("dotenv");
const common = require("./webpack.common.js");

const tsLoader = common.module.rules.find((r) => r.loader === "ts-loader");
if (tsLoader) {
  tsLoader.options = {
    ...tsLoader.options,
    getCustomTransformers: () => ({
      before: [ReactRefreshTypeScript()],
    }),
    transpileOnly: true,
  };
}

const env = dotenv.config({ path: ".env.development" }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 3002,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: false,
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin(envKeys),
  ],
});
