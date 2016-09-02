var config = require('./base');

// mongodb
config.db.host = '127.0.0.1';
config.db.port = 27017;
config.db.name = 'agriculture';
config.db.pass = 'agriculture';

module.exports = config;