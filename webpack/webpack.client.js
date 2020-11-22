require("dotenv").config();
const path = require("path");

//PLUGINS
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const Analyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

//LOADER
const CSSLoader = {
  test: /\.css$/,
  use: [MiniCSSExtractPlugin.loader, "css-loader"],
};
const JsLoader = {
  test: /\.ts$/,
  use: ["babel-loader"],
  exclude: [/node_modules/, /server/],
};

const Client = {
  mode: process.env.MODE,
  entry: "./src/client/index.ts",
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    filename: "public/js/bundle.js",
    publicPath: "/assets/",
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, "../", "dist"),
  },
  module: {
    rules: [CSSLoader, JsLoader],
  },
  plugins: [
    // new HTMLWebpackPlugin({
    //   template: "./src/client/views/index.html",
    //   filename: "views/index.ejs",
    // }),
    // new MiniCSSExtractPlugin({
    //   filename: "/public/style/bundle.css",
    // }),
    //new Analyzer({ analyzerPort: "auto" })
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
};

exports.Client = Client;
