var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  pass: String
});

UserSchema.query.byName = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
};

module.exports = mongoose.model('User', UserSchema);