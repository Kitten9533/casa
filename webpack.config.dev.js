const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        // openPage: '/login',
        // port: 7001,
        hot:true,
        inline: true,
        // compress: true,//Enable gzip compression for everything served
        // overlay: true, //Shows a full-screen overlay in the browser
        open: true, //When open is enabled, the dev server will open the browser.
    }
});