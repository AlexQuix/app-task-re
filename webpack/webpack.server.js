require("dotenv").config();
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const Analyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const JsLoader = {
  test: /\.ts$/,
  use: ["babel-loader"],
  exclude: [/node_modules/, /client/],
};

const Server = {
  mode: process.env.MODE,
  target: "node",
  externals: [nodeExternals()],
  entry: ["./src/server/index.ts"],
  output: {
    filename: "index.js",
    path: path.join(__dirname, "../", "dist"),
  },
  module: {
    rules: [JsLoader],
  },
  plugins: [
    //new Analyzer({ analyzerPort: "auto" })
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
};

exports.Server = Server;
