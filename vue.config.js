module.exports = {
  devServer: {
    host: 'localhost',
    port: 9999,
    https: false,
    open: true,
    hotOnly: true,
    proxy: {
      //配置跨域
      '/api': {
        target: 'http://120.26.185.155:8079', //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '' //请求的时候使用这个api就可以
        }
      }
    }
  },

  outputDir: './dist',
  assetsDir: './assets/',
  publicPath: './',
  indexPath: './index.html'
}
