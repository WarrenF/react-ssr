var path = require('path')
var noReactDOM = 'window.ReactDOM = React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/browser/index.tsx',
	output: {
    path: path.resolve(__dirname, 'dist', 'public'),
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
	resolve: {
    extensions: ['.js', '.ts', '.tsx']
	},
	plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/public' }
      ],
    })
  ]
}
