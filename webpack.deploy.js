const { merge } = require('webpack-merge');
const commonServer = require('./webpack.common.server.js');
const commonBrowser = require('./webpack.common.browser.js');

var browserConfig = merge(commonBrowser, {
	mode: 'production'
});

var serverConfig = merge(commonServer, {
	mode: 'production'
	// ignoreWarnings: [/^(?!CriticalDependenciesWarning$)/]
});

module.exports = [browserConfig, serverConfig];
