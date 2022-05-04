const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports.configureWebpack = {
  devServer: {
    proxy: {
      '^/access_token': {
        target: 'https://www.reddit.com/api/v1/',
        ws: false,
        changeOrigin: true,
        auth: 'Zq0uuPxEQu_aOHpOS3BkYQ:h3c6H_KXPKZcienhDYDD0U95bFGrLA',
      },
      '^/api': {
        target: 'https://oauth.reddit.com/',
        ws: false,
        changeOrigin: true,
        pathRewrite: { '^/api' : '/' }
      }
    }
  }
}
