var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  output: {
    path: 'build',
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    alias: {
      assets: './src/app/assets',
      shared: './src/app/shared',
    }
  },
  devtool: 'cheap-source-map',
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
        test: /\.(jpe|png|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
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
    new DefinePlugin({
      SERVER_ADDRESS: JSON.stringify("http://localhost:8080/api/")
    }),
    new CopyWebpackPlugin([ { from: 'src/app/assets', to: 'assets' } ])
  ]
};
