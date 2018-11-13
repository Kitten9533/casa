const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve('./dist'),
        hot: true
    },
    plugins: [
        new ManifestPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ],
});