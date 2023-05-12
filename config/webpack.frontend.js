const path = require("path");

// PLUGINS
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

// LOADERS
const CSSLoader = {
  test: /\.css$/,
  use: [MiniCSSExtractPlugin.loader, "css-loader"],
};
const JsLoader = {
  test: /\.ts$/,
  use: ["babel-loader"],
  exclude: [/node_modules/],
};

module.exports = {
  mode: "production",
  entry: ["regenerator-runtime", "./src/frontend/index.ts"],
  output: {
    path: path.resolve(__dirname, "../", "dist", "public"),
    filename: "js/bundle.js",
    publicPath: "/"
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../", "dist", "public"),
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
      template: "./src/frontend/index.html",
      filename: "/index.html",
      inject: true,
    }),
    new MiniCSSExtractPlugin({
      filename: "style/bundle.css",
    })
  ],
  resolve: {
    extensions: [".js", ".ts"],
  }
}