const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: {
        main: './scripts/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {loader: "babel-loader"},
            exclude: /node_modules/
        },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'pages/style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
    ]
}