var middlewares = [
  require('./logger'),
	require('./params'),
  require('./user')
];

middlewares = [
  require('./logger'),
	require('./params')
];

module.exports = middlewares;
