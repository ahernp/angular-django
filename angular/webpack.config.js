var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/main.ts',
    output: {
        path: './dist',
        filename: 'ad.bundle.js'
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    }
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: './src/index.html'
    //     })
    // ]
};
