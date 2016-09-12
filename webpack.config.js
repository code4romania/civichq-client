var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  output: {
    path: 'build',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
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
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
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
    })
  ]
}
