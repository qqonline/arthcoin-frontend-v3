module.exports = {
  webpack: (config, env) => {
    if (env === 'production') {
      config.plugins = config.plugins.filter(plugin => plugin.constructor.name !== 'ESLintWebpackPlugin')
    }

    return config
  }
}
