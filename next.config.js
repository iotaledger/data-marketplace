var Webpack = require('webpack')
module.exports = {
  webpack: (config, { buildId, dev }) => {
    // Skip mapbox
    if (!dev) config.module.noParse = /(mapbox-gl)\.js$/
    config.node = {
      fs: 'empty',
    }
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    config.node = {
      fs: 'empty',
    }
    return config
  },
  node: {
    fs: 'empty',
  },
}
