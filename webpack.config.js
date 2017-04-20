const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    entry: {
        style: './src/scss/main.scss'
    },
    output: {
        path: __dirname + '/public/css',
        filename: 'main.css'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader?outputStyle=expanded']
                })
            },
            {
                test: /\.png$/,
                use: ['file-loader?name=public/img/[name].[ext]']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new SpritesmithPlugin({
            src: {
                cwd: './src/img/sprite_assets/',
                glob: '*.png'
            },
            target: {
                image: './public/img/sprite.png',
                css: './src/scss/_sprite.scss'
            },
            apiOptions: {
                cssImageRef: '../img/sprite.png'
            }
        })
    ]
};
