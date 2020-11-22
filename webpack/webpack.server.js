const path = require('path');


const NodeLoader = {
	test: /\.node$/,
	loader: 'node-loader'
}
const JsLoader = {
	test: /\.ts$/,
	use: [
		'ts-loader',
		'babel-loader'
	]
}


const Server = {
	mode: 'development',
	target: 'node',
	entry: './src/server/index.ts',
	output: {
		filename: 'index.js',
		path: path.join(__dirname, '../', 'dist')
	},
	module:{
		rules: [NodeLoader, JsLoader]
	},
	resolve:{
		extensions: ['.js', '.ts']
	}
}


exports.Server = Server;