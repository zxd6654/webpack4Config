/*
 * @Author: zxd 
 * @Date: 2019-09-17 15:30:36 
 * @Last Modified by: zxd
 * @Last Modified time: 2019-09-20 14:53:51
 */
const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },

    output: {
        filename: 'bundle[hash:4].js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/,
                exclude: /node_modules/
            },
            //引用css
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'postcss-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.jpg$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: 'img/',
                    }
                }]
            },
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader',
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true,
        }),
        new ExtractTextWebpackPlugin('css/style.css'),

        new CleanWebpackPlugin(),
    ],

    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: '8888',
        open: true,
        hot: true,
    },

    mode: 'development', //development or production
}