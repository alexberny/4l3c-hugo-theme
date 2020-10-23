const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, './../static/dist/'),
        filename: 'js/[name].[contenthash].js'
    },
  
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                        MiniCssExtractPlugin.loader, 
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
            }

        ]
    },
    
    resolve: {
        extensions: ['.js', '.scss', '.css'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },

    plugins:[
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),

        new AssetsPlugin({
			filename: 'webpack_assets.json',
            path: path.join(__dirname, '../data'),
            removeFullPathAutoPrefix: true,
			prettyPrint: true
		}),
    ]
}