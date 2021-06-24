const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';

    return {
    
        entry: './js/main.js',
        output: {
            path: path.resolve(__dirname, './../static/dist/'),
            filename: devMode ? 'js/[name].js' : 'js/[name].[contenthash].js',
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
                        //devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 0,                                
                            }
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options : {
                                sassOptions: {
                                    outputStyle: 'expanded',
                                }
                            }
                        },
                    ]
                }

            ]
        },
        
        resolve: {
            extensions: ['.js', '.scss', '.css'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        },

        plugins:[
            new CleanWebpackPlugin(),
            // new webpack.SourceMapDevToolPlugin(),
            new MiniCssExtractPlugin({
                filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
            }),

            new AssetsPlugin({
                filename: 'webpack_assets.json',
                path: path.join(__dirname, '../data'),
                removeFullPathAutoPrefix: true,
                prettyPrint: false
            }),
        ],

        optimization: {
            minimizer: [
              new CssMinimizerPlugin(),
            ],
          },
    }
}