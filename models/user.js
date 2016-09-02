var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  pass: String,
  salt: String,
  token: String,//鉴权
  level: Number,
  create_at: {type: Date, default: Date.now}
}, {
  versionKey: false,
  toJSON: {getters: true, virtuals: true},
  toObject: {getter: true, virtuals: true}
});

UserSchema.query.byName = function (name) {
  return this.find({name: new RegExp(name, 'i')});
};

module.exports = mongoose.model('User', UserSchema);