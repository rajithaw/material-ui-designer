const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        bundle: ['@babel/polyfill', 'whatwg-fetch', './src/index.js'],
        style: './static/css/app.css'
    },
    output: {
        path: path.join(__dirname, '../wwwroot'),
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
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
        contentBase: path.join(__dirname, '../wwwroot'),
        port: 5000,
        inline: true,
        compress: true,
        proxy: {
            '/api': 'http://localhost:3000'
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
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
