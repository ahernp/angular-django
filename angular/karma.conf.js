var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            {pattern: 'src/**/*spec.ts'}
        ],

        exclude: [],

        preprocessors: {
            'src/**/*spec.ts': ['webpack', 'sourcemap']
        },

        mime: {
            'text/x-typescript': ['ts','tsx']
        },

        webpack: webpackConfig,

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity
    })
}
