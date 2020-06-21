//express

let express = require('express');

let app = express();
let webpack = require('webpack');

//中间件
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');

let compiler = webpack(config); //编译后的结果

app.use(middle(compiler));

// app.get('/api/user', (req, res) => {
//     res.json({
//         name: '朱晓东'
//     })
// })
app.get('/user', (req, res) => {
    res.json({
        name: '如果后端给的请求没有API'
    })
})

app.listen(8086)