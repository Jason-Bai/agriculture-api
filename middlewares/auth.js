var User = require('./user');

module.exports = function (opts) {
  return function (req, res, next) {
    if (req.user) {
      next()
    } else {
      res.status(401).end()
    }
  }
};