const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    server: "./src/backend/index.ts"
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: 'commonjs',
    libraryExport: 'default',
    library: 'index',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: [/node_modules/, path.resolve(__dirname, "../", "src/frontend")]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ],
  target: "node",
  externals: [
    {
      mongodb: "commonjs mongodb",
      mongoose: "commonjs mongoose"
    }
  ]
};