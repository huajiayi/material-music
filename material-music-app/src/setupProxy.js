const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/music-api', {
      target: 'http://localhost:3001/',
      changeOrigin: false,
      pathRewrite: {
        "^/music-api": "/"
      }
    })
  )
  app.use(
    proxy('/api', {
      target: 'http://localhost:8080/',
      changeOrigin: false,
    })
  )
}