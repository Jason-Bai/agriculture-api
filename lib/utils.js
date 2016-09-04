var _ = require('lodash')
  , moment = require('moment')
  , errors = require('./errors')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , async = require('async');


var utils = {
  _: _,
  moment: moment,
  errors: errors,
  async: async,
  getToken: function (req) {
    var token = req.body && req.body.token || req.query && req.query.token || req.headers['x-access-token'];
    return token;
  },
  findByPage: function (pageIndex, pageSize, Model, populate, queryParams, sortParams, callback) {
    var start = (pageIndex - 1) * pageSize;
    var res = {
      pageIndex: +pageIndex
    };
    async.parallel({
      count: function (done) {
        Model.count(queryParams, function (err, count) {
          done(err, count);
        });
      },
      records: function (done) {
        Model.findByPage(queryParams, start, pageSize, populate, sortParams, function (err, docs) {
          done(err, docs);
        });
      }
    }, function (err, results) {
      var count = results.count;
      res.pageCount = (count - 1) / pageSize + 1;
      res.results = results.records;
      callback(err, res);
    });
  }
};

module.exports = utils;