module.exports = {
  publicPath:'/management/',
  devServer: {
    proxy: 'http://localhost:8888'
  }
}