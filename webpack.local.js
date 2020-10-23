const { merge } = require('webpack-merge');
const commonServer = require('./webpack.common.server.js');
const commonBrowser = require('./webpack.common.browser.js');

var browserConfig = merge(commonBrowser, {
	mode: 'development'
});

var serverConfig = merge(commonServer, {
	mode: 'development'
});

module.exports = [browserConfig, serverConfig];
