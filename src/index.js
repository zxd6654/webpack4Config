import $ from 'jquery';
//全局的$
// import $ from 'expose-loader?$!jquery';
console.log(window.$);


let str = require('./a');
console.log(str, 'hello');

require('./index.css');

require('./a.css');

require('./index.less');

let fn = () => console.log('log');

fn();

@log
class A {
    constructor() {
        console.log('报错了');
    }
    a = 1;
};

console.log(new A().a);

function log(target) {
    console.group(target);
}

//打包图片
import logo from './maxresdefault.jpg'; //返回的结果是一个新的图片地址

console.log(logo);

let image = new Image();
image.src = logo;
document.body.appendChild(image);


//代理
//http://loachost:3000 ->http://loachost:8086
let xhr = new XMLHttpRequest();
// xhr.open('GET', '/api/user', true);
xhr.open('GET', '/user', true);

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response);
    }
}

xhr.send(null);


//resolve属性
// import('bootstrap/dist/css/bootstrap.css');
import('bootstrap');

//环境变量
let url = '';
if (DEV) {
    url = 'http://localhost:3000'
} else {
    url = 'http://maidou.space'
}

console.log(url)

//优化
import moment from 'moment';

//手动映入
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

let r = moment().endOf('day').fromNow();
console.log(r);


//抽离公共代码
import calc from './test';
//import 在生产环境下 会自动去除掉没用的代码 
//tree-shaking 把没用的代码自动删除

console.log(calc.sum(1, 2));

//引入公共资源
import './a'
import './b'


//懒加载  vue react都是这样实现的
let button = document.createElement('button');

button.addEventListener('click', function () {
    console.log('click');
    //es6草案中的语法 jsonp实现动态加载文件
    import('./source.js').then(data => {
        console.log(data.default)
    });
});

button.innerHTML = '懒加载'

document.body.appendChild(button);


//热更新
import source from './source.js';
console.log(source);

if (module.hot) {
    module.hot.accept('./source', () => {
        console.log('更新了')
        let str = require('./source');
        console.log(str);
    })
}