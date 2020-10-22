var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var noReactDOM = 'window.ReactDOM = React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'

var browserConfig = {
	entry: './src/browser/index.tsx',
	output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
	},
	externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-dom/server': noReactDOM,
    redux: 'Redux',
    'react-redux': 'ReactRedux'
  },
  module: {
    rules: [
      {
				test: /\.(tsx?)$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/
			},
    ]
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
	],
	resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
}

var serverConfig = {
	entry: './src/server/index.tsx',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  mode: 'production',
  module: {
    rules: [
      {
				test: /\.(tsx?)$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/
			}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
	],
	resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
}

module.exports = [browserConfig, serverConfig]
