const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
	plugins: [
		new MiniCssExtractPlugin({
			//提取css
			filename: 'css/main.css'
		}),
		new BundleAnalyzerPlugin({ analyzerPort: 8081 })
	],

	devtool: 'source-map',
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				//压缩js
				cache: true,
				parallel: true,
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin() //压缩css
		]
	}
});
