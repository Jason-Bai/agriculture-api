var utils = require('../lib/utils');

var User = require('../controllers').User;

module.exports = function (opts) {
  
  return function (req, res, next) {

    if (!req.decoded) {
      var errMsg = utils.errors.NotFound('User not found!');
      return res.json(errMsg);
    }

    var userId = req.decoded._doc._id;

    User.get(userId, function (err, user) {

      if (err) {
        var errMsg = utils.errors.ISE('get user: ' + err.toString() + '!');
        return res.json(errMsg);
      }

      if (!user) {
        var errMsg = utils.errors.NotFound('User not found!');
        return res.json(errMsg);
      }

      req.user = user;

      next();

    });

  }
};