require("dotenv").config();
const path = require("path");

// PLUGINS
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const Analyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// LOADERS
const CSSLoader = {
  test: /\.css$/,
  use: [MiniCSSExtractPlugin.loader, "css-loader"],
};
const JsLoader = {
  test: /\.ts$/,
  use: ["babel-loader"],
  exclude: [/node_modules/, /server/],
};

module.exports = {
  mode: process.env.MODE,
  entry: ["regenerator-runtime", "./src/client/index.ts"],
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    filename: "public/js/bundle.js",
    publicPath: "/assets/",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../", "dist"),
    },
    port: 9000,
    compress: true,
    open: true,
    proxy: {
      "/api": "http://localhost:3000",
    }
  },
  module: {
    rules: [CSSLoader, JsLoader],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
      inject: true,
    }),
    new MiniCSSExtractPlugin({
      filename: "/public/style/bundle.css",
    }),
    // new Analyzer({ analyzerPort: "auto" })
  ],
  resolve: {
    extensions: [".js", ".ts"],
  }
}