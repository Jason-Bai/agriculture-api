/**
 * Created by antianlu on 16/9/2.
 */

module.exports = function (app) {

  app.use('/api/v1/users', require('./users'));
  app.use('/api/v1/categories', require('./categories'));
  app.use('/api/v1/product', require('./product'));
  app.use('/api/weixin', require('./weixin'))
};