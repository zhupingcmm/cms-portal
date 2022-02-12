const path = require('path');
const WebpackCleanPlugin  = require('webpack-clean-plugin');
const CleanWebpackTerminalPlugin = require('clean-terminal-webpack-plugin');
const ProgressBarPlugin = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../../src/index.tsx')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../dist'),
        clean: true
    },
    stats: "errors-warnings",
    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test:/\.(tsx|ts)?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            },
            {
                test:/\.(css|scss|sass|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new WebpackCleanPlugin(),
        new CleanWebpackTerminalPlugin(),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../src/index.html'),
            hash: false,
            favicon: path.resolve(__dirname, '../../static/favicon.ico'),
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:8].css',
          })
    ]
}