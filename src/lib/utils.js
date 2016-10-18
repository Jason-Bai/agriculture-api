var _ = require('lodash')
  , moment = require('moment')
  , errors = require('./errors')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , async = require('async');



var common = {},
  extend = _.extend,
  crypto = require('crypto'),
  fs = require('fs');

common.getRandom = function (begin, end) {
  return Math.floor(Math.random() * (end - begin)) + begin;
}

common.pagination = function (op) {
  var page = (op.page | 0) || 1,
    pre_count = (op.pre_count | 0) || 10;
  return {
    page: page < 0 ? 1 : page,
    pre_count: pre_count < 0 ? 1 : pre_count
  }
}

common.toDate = function (days) {
  var d = new Date();
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  var t1 = Date.parse(m + "/28/" + y);
  var t2 = Date.parse(m + 1 + "/1/" + y);
  var thisMonthDays = 27 + (t2 - t1) / (60 * 60 * 24 * 1000);
  var nowDay = d.getDate();
  var overDay = nowDay + days - thisMonthDays;
  if (overDay >= 0) {
    m++;
    nowDay = overDay;
  } else {
    nowDay++;
  }
  if (m == 12) {
    y++;
    m = 1;
  }
  console('今天过多' + days + '天就是' + y + '年' + m + '月' + nowDay + '日');
  return new Date(y + '-' + m + '-' + nowDay);
}

common.httpReg = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;

common.getHostname = function (api) {
  var serverHost = '';

  if (!(/^(http[s]{0,1}|ftp)?:\/\//.test(api.hostname))) {
    serverHost = 'http://' + api.hostname;
    if (api.port) {
      serverHost += ':' + api.port;
    }
  }
  else {
    serverHost = api.hostname;
  }

  return serverHost;
}

common.inArray = function (v, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (v == arr[i]) return true;
  }
  return false;
}

common.isEmpty = function (obj) {
  for (var name in obj) {
    return false;
  }
  return true;
};

common.getParams = function (req, p) {
  p = p || {query: 1, body: 1, params: 1};
  return common.extend(true, ((p.query && req.query) || {}), ((p.body && req.body) || {}), ((p.params && req.params) || {}));
}

common.sha1Hash = function (str, addSalt) {
  var salt = (addSalt) ? new Date().getTime() : '';
  return crypto.createHmac('sha1', salt + '').update(str + '').digest('hex');
};

common.md5Hash = function (str) {
  return crypto.createHash('md5').update(str + '').digest('hex');
};

Number.prototype.toDeceimal = function (fractionDigits) {
  fractionDigits = fractionDigits || 2;
  with (Math) {
    return round(this * pow(10, fractionDigits)) / pow(10, fractionDigits);
  }
};

var utils = {
  _: _,
  moment: moment,
  errors: errors,
  async: async,
  getToken: function (req) {
    var token = req.body && req.body.token || req.query && req.query.token || req.headers['x-access-token'];
    return token;
  }
};

/*
for (var k in common) {
  utils[k] = common[k];
}
*/

module.exports = utils;
