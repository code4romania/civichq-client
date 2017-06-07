var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    output: {
        path: 'dist',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    //devtool: 'cheap-source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts!angular2-template'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new UglifyJsPlugin({
            beautify: false, //prod
            mangle: { screw_ie8 : true, keep_fnames: true }, //prod
            compress: { screw_ie8: true }, //prod
            comments: false //prod
        }),
        new DefinePlugin({
            SERVER_ADDRESS: JSON.stringify("http://api.centrucivic.ro/api/"),
        })
    ]
};