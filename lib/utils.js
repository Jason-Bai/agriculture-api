/**
 * please use lodash
 * https://github.com/lodash/lodash/wiki/Migrating
 */
var _ = require('lodash')
  , moment = require('moment');

var utils = {
  _: _,
  moment: moment
};

module.exports = utils;