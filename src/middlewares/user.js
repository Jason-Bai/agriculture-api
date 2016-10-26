var utils = require('../lib/utils');

var configs = require('../configs');

var UserCtrl = require('../controllers').UserCtrl;

module.exports = function (opts) {

  return function (req, res, next) {

    var key = req.method + " " + req.url

    console.log(key, utils._.indexOf(configs.whiteList, key));

    if (utils._.indexOf(configs.whiteList, key) !== -1) {
      return next();
    }


    var token = utils.getToken(req);

    if (token) {

      utils.jwt.verify(token, configs.secret, function (err, decoded) {
        if (err) {
          var errMsg = utils.errors.ISE('token invalid.');
          return res.json(errMsg);
        }
        req.decoded = decoded;

        var userId = req.decoded._doc._id;

        UserCtrl.get(userId, function (err, user) {

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

      });
    } else {

      var errMsg = utils.errors.Forbidden('No token provided.');

      return res.json(errMsg);
    }

  }
};