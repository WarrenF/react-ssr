var path = require('path')
var nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/server/index.tsx',
	target: 'node',
	externals: [nodeExternals()],
  output: {
		libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
				test: /\.(tsx?)$/,
				use: ['ts-loader'],
				exclude: /node_modules/
			}
    ]
  },
	resolve: {
    extensions: ['.js', '.ts', '.tsx']
	}
}
