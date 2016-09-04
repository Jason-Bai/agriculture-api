var _      =  require('underscore'),
    moment = require('moment'),
    errors = require('./errors');

var utils = {
  _: _,
  moment: moment,
  errors: errors,
  getToken: function (req) {
    var token = req.body && req.body.token || req.query && req.query.token || req.headers['x-access-token'];
    return token;
  }
};

module.exports = utils;