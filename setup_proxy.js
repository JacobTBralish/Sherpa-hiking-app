const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
    '/api',
    '/auth/callback',
    '/api/logout'

    ],{ target: 'http://localhost:4000' }));
};