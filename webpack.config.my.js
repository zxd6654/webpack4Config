let path = require('path');

module.exports = {
    devServer: {

    },
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    }
}