var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");

module.exports = {
  entry: {
    polyfills: "./src/polyfills.ts",
    vendor: "./src/vendor.ts",
    app: "./src/main.ts"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      assets: "./src/app/assets",
      shared: "./src/app/shared"
    }
  },
  devtool: "cheap-source-map",
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "ts-loader!angular2-template-loader"
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.(jpe|png|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: "file-loader?name=assets/[name].[hash].[ext]"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.resolve(__dirname, "src"), // path to your src
      {}
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "vendor", "polyfills"],
      children: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new DefinePlugin({
      SERVER_ADDRESS: JSON.stringify("http://localhost:8080/api/")
    })
  ]
};
