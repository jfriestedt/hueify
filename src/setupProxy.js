const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/login',
    proxy({
      target: process.env.REACT_APP_HOST,
      changeOrigin: true
    })
  );

  app.use(
    '/refresh_token',
    proxy({
      target: process.env.REACT_APP_HOST,
      changeOrigin: true
    })
  );
};
