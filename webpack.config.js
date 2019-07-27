const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = 'public';

module.exports = {
    entry: {
        bundle: ['@babel/polyfill', 'whatwg-fetch', './src/client/index.js'],
        style: './static/css/app.css'
    },
    output: {
        path: path.join(__dirname, outputDirectory),
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
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            fallback: "file-loader",
                            name: "[name].[ext]",
                            outputPath: "images"
                        },
                    },
                ]
            },
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                include: [/src/],
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint/lib/cli-engine/formatters/stylish'),     // Fix eslint-loader issue with eslint 6.x. (https://github.com/webpack-contrib/eslint-loader/issues/271)
                    emitWarning: false
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, outputDirectory),
        port: 3000,
        inline: true,
        compress: true,
        proxy: {
            '/api': 'http://localhost:5000'
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
    },
    node: {
        fs: "empty"     // Resolve webpack issue - babel transform Module not found: Error: Can't resolve 'fs'
    }
};
