var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
	isDelete: Number,
	level: Number,
	createdAt: Date,
	updatedAt: Date
}, {
    versionKey: false
});

module.exports = mongoose.model('Category', CategorySchema);
