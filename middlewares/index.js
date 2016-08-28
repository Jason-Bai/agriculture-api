var middlewares = [
  require('./logger'),
  require('./user'),
  require('./auth')
];


module.exports = middlewares;