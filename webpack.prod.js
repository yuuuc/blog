const { merge } = require('webpack-merge');
const common = require('./webpack.common');
// import { Configuration } from 'webpack';
// gzip 压缩
const CompressionPlugin = require('compression-webpack-plugin');
// 打包视图显示
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * @type {Configuration}
 */
const config = {
	plugins: [
		// gzip 压缩
		new CompressionPlugin(),
		// new MiniCssExtractPlugin({
		// 	//提取css
		// 	filename: 'css/main.css'
		// }),
		new BundleAnalyzerPlugin({ analyzerPort: 8081 })
	],

	devtool: 'source-map',
	optimization: {
		minimizer: [
			//	new OptimizeCSSAssetsPlugin() //压缩css
		],
		splitChunks: {
			chunks: 'all',
			minSize: 614400, // 小于这个大小的文件，不分割
			maxSize: 666666, // 包最大的大小
			// 缓存分组
			cacheGroups: {
				vendors: {
					name: 'vendor', // chunk 名称
					test: /node_modules/,
					priority: 1, // 优先级，数值越大，优先级越高
					minChunks: 1 // 最少复用一次
				},
				common: {
					name: 'common',
					minChunks: 2,
					minSize: 0
				}
			}
		}
	}
};

module.exports = merge(common, config);
