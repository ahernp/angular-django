var webpack = require('webpack');

module.exports = {
    entry: {
        'ad': './src/main.ts',
        'vendor': './src/vendor.ts',
    },
    output: {
        path: './dist',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})
    ]
};
