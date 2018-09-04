const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		library: 'Bashme',
		libraryTarget: 'umd',
		umdNamedDefine: true
	}
};