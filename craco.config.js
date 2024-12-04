const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const smp = new SpeedMeasurePlugin()

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // Ensure MiniCssExtractPlugin is not already added
      if (!webpackConfig.plugins.find((plugin) => plugin instanceof MiniCssExtractPlugin)) {
        webpackConfig.plugins.push(new MiniCssExtractPlugin())
      }

      // Wrap the existing webpack configuration with SpeedMeasurePlugin
      // return smp.wrap(webpackConfig)
      return webpackConfig
    },
  },
}
