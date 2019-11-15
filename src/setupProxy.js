const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/login',
    proxy({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );

  app.use(
    '/refresh_token',
    proxy({
      target: 'http://localhost:3001',
      changeOrigin: true
    })
  );
};
