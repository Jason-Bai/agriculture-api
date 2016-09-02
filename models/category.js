var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  sub_category: Schema.Mixed
}, {versionKey: false});

module.exports = mongoose.model('Category', CategorySchema);