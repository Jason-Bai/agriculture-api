var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
  name: String,
  sub_category: Schema.Types.Mixed
}, {
    versionKey: false
});

module.exports = mongoose.model('Categories', CategoriesSchema);