var mongoose    = require('mongoose');
var configs     = require('../configs');

var mongodbUrl = "mongodb://" + configs.db.user + ':' + configs.db.pass + '@' + configs.db.host + ":" + configs.db.port + "/" + configs.db.name;

//var mongodbUrl = "mongodb://" + configs.db.host + ":" + configs.db.port + "/" + configs.db.name;

exports.connect = function () {
  mongoose.connect(mongodbUrl)
};
