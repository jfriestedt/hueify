const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/login',
    proxy({
      target: 'http://localhost:8888',
      changeOrigin: true,
    })
  );

  app.use(
    '/users',
    proxy({
      target: 'http://localhost:8888',
      changeOrigin: true,
    })
  );
};
