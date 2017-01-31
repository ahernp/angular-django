var webpack = require('webpack');

module.exports = {
    entry: './src/timers/timer.component.spec.ts',
    output: {
        path: './dist',
        filename: 'ad.test.bundle.js'
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
};
