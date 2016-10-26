var utils = require('../lib/utils');

module.exports = function () {
	return function (req, res, next) {
		req.params = utils._.extend({}, req.query || {}, req.body || {});
		next();
	}
};