var middlewares = [
  require('./logger'),
	require('./params'),
  require('./auth'),
  require('./user')
];

middlewares = [
  require('./logger'),
	require('./params')
];

module.exports = middlewares;
