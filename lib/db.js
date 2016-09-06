var mongoose    = require('mongoose');
var configs     = require('../configs');
require('mongoose-pagination');

var mongodbUrl = "mongodb://"  + configs.db.host + ":" + configs.db.port + "/" + configs.db.name;

exports.connect = function () {
  mongoose.connect(mongodbUrl)
};