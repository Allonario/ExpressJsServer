const path = require('path');

module.exports = {
    entry: {
        index: './public/js/index.js',
        news: './public/js/index.js',
        profile: './public/js/index.js'

    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'webpack/js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
    },
};