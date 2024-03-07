const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5297', // 修改为你的后端服务地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '', // 重写请求路径，将路径中的 '/api' 替换为空字符串
        },
      },
    },
  },
})

