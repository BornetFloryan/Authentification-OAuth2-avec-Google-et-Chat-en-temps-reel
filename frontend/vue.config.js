const { defineConfig } = require('@vue/cli-service');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    setupMiddlewares(middlewares, devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use(createProxyMiddleware('/auth/*', { target: 'http://localhost:5000/' }));
      devServer.app.use(createProxyMiddleware('/api/*', { target: 'http://localhost:5000/' }));

      return middlewares;
    },
  },
});