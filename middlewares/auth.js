var jwt = require('jsonwebtoken');

var configs = require('../configs');
var utils = require('../lib/utils');
var Users = require('../controllers/users');

function auth(req, res, next) {
  var params = utils.getParams(req);
  if (params.token) {
    Users.findUserProfile({id: params.userId}, function (docs) {
      res.json(docs);
    });
  } else {
    // res.redirect('/signin');
    res.end(401).json({code: 401, msg: 'lost token'});
  }
}

module.exports = function (opts) {
  return function (req, res, next) {

    var token = utils.getToken(req);

    if (token) {
      jwt.verify(token, configs.secret, function (err, decoded) {
        if (err) {
          var errMsg = utils.errors.ISE('token invalid.');
          return res.json(errMsg);
        }
        req.decoded = decoded;
        next();
      });
    } else {
      var errMsg = utils.errors.Forbidden('No token provided.');
      return res.json(errMsg);
    }

  }
};


module.exports.auth = auth;