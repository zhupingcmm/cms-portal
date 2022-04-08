const path = require("path");
const WebpackCleanPlugin = require("webpack-clean-plugin");
const CleanWebpackTerminalPlugin = require("clean-terminal-webpack-plugin");
const ProgressBarPlugin = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "../../src/index.tsx"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../../dist"),
    clean: true,
  },
  stats: "errors-warnings",
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".json"],
    preferRelative: true,
    alias: {
      "@src": path.resolve(__dirname, "../../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.(css|scss|sass|less)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$i/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new WebpackCleanPlugin(),
    new CleanWebpackTerminalPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../../src/index.html"),
      hash: false,
      favicon: path.resolve(__dirname, "../../static/favicon.ico"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:8].css",
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // common: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'common',
        //   chunks: 'all',
        //   priority: 1,
        //   enforce: true,
        //   reuseExistingChunk: true
        // },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
          name: "react-family",
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          name: "antd",
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
        },
        tool: {
          test: /[\\/]node_modules[\\/](qs|lodash)[\\/]/,
          name: "tool",
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
