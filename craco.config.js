const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      // Wrap the existing webpack configuration with SpeedMeasurePlugin
      // return smp.wrap(webpackConfig)
      return webpackConfig
    },
  },
}
