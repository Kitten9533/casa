const path = require('path');
const DIST_PATH = path.resolve(__dirname, 'dist');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        app: path.resolve('./src/main.js')
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve('./dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.resolve('./src'),
            root: path.resolve('./'),
            utils: path.resolve('./utils'),
            components: path.resolve('./src/components'),
            avatar: path.resolve('./static/avatar'),
        },
    },
    externals: {//引入三方包
        "testPlugin": "testPlugin"
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {//图片
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,//i不区分大小写
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './static/img/'//图片输出位置
                        }
                    },
                    'image-webpack-loader'//图片压缩工具
                ]
            },
            {//字体图标
                test: /\.(eot|woff|woff2|ttf)$/i,
                // include: path.resolve(__dirname, 'node_modules'),
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 30000,
                        outputPath: './static/font/'//图片输出位置
                    }
                }
            },
            {//数据
                test: [/\.json$/i],//i不区分大小写
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './static/data/'//图片输出位置
                        }
                    }
                ]
            },
            {//音乐
                test: [/\.mp3$/i],//i不区分大小写
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './static/music/'//图片输出位置
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: require.resolve('css-loader'),
                        // options: {
                        //     importLoaders: 1,
                        //     modules: true,
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        // },
                    },
                ]
            },
            {
                test: /\.less$/,
                // include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                // include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [/*  */
        // new webpack.HotModuleReplacementPlugin()
        new copyWebpackPlugin([{//复制static到dist
            from: __dirname + '/static',//打包的静态资源目录地址
            to: __dirname + '/dist/static' //打包到dist下面的static
        }]),
        new HtmlWebpackPlugin({
            favicon: path.resolve('./static/favicon.ico'),
            template: path.resolve('./index.html'),
            hash: true, //是否添加hash值
            minify: { //压缩HTML文件
                removeComments: true,//移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            },
            chunksSortMode: 'none' //如果使用webpack4将该配置项设置为'none'
        })
    ]
};