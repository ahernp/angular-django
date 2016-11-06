var webpack = require('webpack');

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
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          comments: false,
          compress: {
              warnings: false,
              drop_console: true
          },
          mangle: {
              screw_ie8 : true,
          }
      })
    ]
};
