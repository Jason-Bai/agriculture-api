var middlewares = [
  require('./logger'),
  require('./auth'),
  require('./user')
];

module.exports = middlewares;