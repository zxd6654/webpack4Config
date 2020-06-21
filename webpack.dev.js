let {smart} =require('webpack-merge');
let base=require('webpack.config');

module.exports=smart(base,{
    mode:'development'
});
