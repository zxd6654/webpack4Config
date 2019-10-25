/*
 * @Author: zxd 
 * @Date: 2019-09-17 15:30:36 
 * @Last Modified by: zxd
 * @Last Modified time: 2019-10-25 11:12:12
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
        //在script标签里或者浏览器console里调用webpack打包后的函数
        library: '', //导出库的名字   
        libraryTarget: 'umd',
        //导出方式 由于浏览器环境和node环境的区别，所以产生了window（客服端浏览器）和global（node服务端）的区别。
        //我理解的var即在script导入时和window一致， 是否可以通过import导入， 导入之后的使用还待解释。
        //umd即支持所有情况的自定义。
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