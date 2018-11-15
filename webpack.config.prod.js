const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(),       　　　　//根目录
            verbose: true,        　　　　 　　　//开启在控制台输出信息
            dry: false        　　　　　　　　　　//启用删除文件
        })
    ]
});