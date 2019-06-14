const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = {
    entry: {
        bundle: ['@babel/polyfill', './src/index.jsx'],
        style: './static/css/app.css'
    },

    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: 'images/'
                      },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                include: [/src/],
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: false
                }
            }
        ]
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, './public'),
        port: 3001,
        inline: true,
        compress: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5001',
                secure: false,
                changeOrigin: true
            }
        }
    },

    plugins: [
        new CleanWebpackPlugin({
            verbose: false
        }),
        new HtmlWebpackPlugin({
            template: './static/index.html',
            favicon: './static/favicon.ico',
            chunks: ['bundle', 'style']
        }),
        new CopyWebpackPlugin([
            { from: 'static/images', to: 'images/' }
        ])
    ],

    resolve: {
        extensions: ['.js', '.jsx'],
    }
}

module.exports = webpackConfig