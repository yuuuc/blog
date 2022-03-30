const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
module.exports = merge(common, {
	devtool: 'source-map',
	devServer: {
		static: path.join(__dirname, '/'),
		open: true,
		port: 3001,
		hot: true,
		compress: true, // gzip 压缩,
		historyApiFallback: true
	}
});
