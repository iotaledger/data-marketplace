var Webpack = require("webpack")
module.exports = {
  webpack: (config, { buildId, dev }) => {
    // Skip mapbox
    if (!dev) config.module.noParse = /(mapbox-gl)\.js$/
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    return config
  }
}
