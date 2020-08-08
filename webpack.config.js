//webpack 是node写出来的 node语法
let path = require("path"); //内置模块
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
let UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
let Webpack = require("webpack");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");
let TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    //优化项
    minimizer: [
      // new UglifyJsWebpackPlugin({
      //     cache: true, //是否缓存
      //     parallel: true, //是否是并发
      //     sourceMap: true, //源码映射
      // }), //当使用optimize-css-assets-webpack-plugin压缩css,js就不压缩了,要是用这个插件
      new OptimizeCssAssetsWebpackPlugin(), //压缩css代码
      new TerserPlugin({
        //清除console日志
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
    ],
    splitChunks: {
      //分割代码块
      cacheGroups: {
        //缓存组
        common: {
          //公共模块
          chunks: "initial",
          minSize: 0, //大小
          minChunks: 2, //公用次数
        },
        vender: {
          //第三方插件抽离
          priority: 1, //优先级,优先处理
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
  devServer: {
    //开启本地服务器的配置
    port: 3000,
    progress: true,
    contentBase: "./build",
    compress: true, //gzip压缩
    // proxy: {
    //'/api': 'http://localhost:8086' //1 配置了一个代理

    // '/api': { //2没有api的字段，自己添加统一跨域的接口字段，重写的方式 把服务器代理到express服务器上
    //     target: 'http://localhost:8086',
    //     pathRewrite: {
    //         '/api': ''
    //     }
    // },
    // }

    // before(app) { //3 我们前端只想单纯来模拟数据    提供的钩子方法
    //     app.get('/user', (req, res) => {
    //         res.json({
    //             name: '我们前端只想单纯来模拟数据-before'
    //         })
    //     })
    // },

    //4 有服务端，不用代理, 服务端启动webpack
  },
  mode: "production", //模式  production development
  entry:
    //  './src/index.js', //入口
    {
      //多入口
      home: "./src/index.js",
      other: "./src/other.js",
    },
  output: {
    // filename: 'bundle[hash:8].js', //打包后的文件  添加8位hash
    filename: "[name][hash:8].js", //打包后的文件  添加8位hash
    path: path.resolve(__dirname, "build"), //路径必须是一个绝对路劲
    //publicPath: 'http://maidou.space'
  },
  module: {
    //模块
    noParse: [/jquery$/], //不去解析jq的依赖库
    rules: [
      {
        test: /\.html$/,
        use: "html-withimg-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        // use: 'file-loader'
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024, //当我们的图片 小于多少k,用base64来转化
            esModule: false, //esModule: true该配置项为图片打包后的默认路径，带default对象，默认为ture， 在配置项里将此项改为false即可去掉多余的defalut对象，
            outputPath: "img/", //输出路径
            // publicPath: 'http://maidou.space'
          },
        },
      },
      {
        test: require.resolve("jquery"),
        use: "expose-loader?$",
      },
      // {
      //     test: /\.js$/, //js语法校验
      //     use: {
      //         loader: 'eslint-loader',
      //         options: {
      //             enforce: 'pre', //强制先执行
      //         }
      //     }
      // },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            //用babel-loader 需要吧es6转成es5
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true,
                },
              ],
              [
                "@babel/plugin-proposal-class-properties",
                {
                  loose: true,
                },
              ],
              "@babel/plugin-transform-runtime",
            ],
          },
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      //规则 css-loader 解析@import这种语法
      //style-loader 是吧css插入到head的标签中
      //loader的特点 希望单一
      //loader的用法 use:字符串和 use:数组
      //loader的顺序 默认是从右向左执行
      //loader还可以写成对象形式  可以传递其他参数
      {
        test: /\.css$/,
        // use: 'css-loader'
        // use: ['style-loader', 'css-loader'],
        use: [
          //     {
          //      loader: 'style-loader',
          //      options: {
          //         insert: 'body', //默认是head
          //     }
          //    }
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      //处理less文件
      // less   less  less-loader
      // sass   sass  sass-loader
      // stylus   stylus  stylus-loader
      {
        test: /\.less$/,
        use: [
          //     {
          //     loader: 'style-loader',
          //     options: {
          //         insert: 'body'
          //     }
          // }
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  devtool: "source-map", //源码映射 会标识错误的代码 打包后生成独立的文件 大而全
  // devtool: 'eval-source-map', //源码映射 不会生成单独的文件 但是可以显示行和列
  // devtool: 'cheap-module-source-map', //源码映射 不会产生列有行，生成单独的映射文件
  // devtool: 'cheap-module-eval-source-map', //源码映射 不会产生文件 集成在打包后的文件中 不会产生列有行
  watch: true,
  watchOptions: {
    //监控选项
    poll: 1000, //每秒问一次
    aggregateTimeout: 500, //防抖,一直输入代码 不打包
    ignored: /node_modules/, //不需要监控的文件
  },
  resolve: {
    //解析第三方包 common
    modules: [path.resolve("node_modules")],
    // alias: {
    //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
    // },
    // mainFiles: [],//入口文件
    mainFields: ["style", "main"],
    extensions: [".js", ".css", ".json"], //省略扩展名
  },
  plugins: [
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html", //默认叫index.html
      minify: {
        removeAttributeQuotes: true, //删除html中的双引号
        collapseWhitespace: true, //去掉折叠空行
      },
      chunks: ["home"],
      hash: true, //会在打包好的bundled.js后面加上hash串
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "other.html", //默认叫index.html
      minify: {
        removeAttributeQuotes: true, //删除html中的双引号
        collapseWhitespace: true, //去掉折叠空行
      },
      chunks: ["other"], //['home','other']
      hash: true, //会在打包好的bundled.js后面加上hash串
    }),
    new MiniCssExtractPlugin({
      //压缩css
      filename: "css/main.css",
      chunkFilename: "[id].css",
    }),
    new Webpack.ProvidePlugin({
      $: "jquery", //在每个模块中都注入全局的$
    }),
    new CleanWebpackPlugin(), //每次打包之前删掉build目录
    new CopyWebpackPlugin({
      //复制单个文件或整个目录建立目录
      patterns: [
        {
          from: "doc",
          to: "",
        },
      ],
    }),
    new Webpack.BannerPlugin("make 2020.6.17"), //为每个 chunk 文件头部添加 banner
    new Webpack.DefinePlugin({
      DEV: "'development'", //console.log('dev')
      PROD: JSON.stringify("production"),
      FLAG: "true",
    }),
    new Webpack.IgnorePlugin(/\.\/locale/, /moment/), //忽略相关的包
    new Webpack.NamedModulesPlugin(), // 热更新  打印更新的模块路径
    new Webpack.HotModuleReplacementPlugin(), //热更新
  ],
  // externails: {
  //     jquery: 'jQuery',
  // }
};
