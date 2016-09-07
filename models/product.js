/**
 * Created by antianlu on 16/9/2.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: { type: String, index: 1 },
  price: Number,
  description: String,
  categoryId: Schema.ObjectId,
  picture: String,
  create_at: { type: Date, default: Date.now }
}, {
    versionKey: false
});

ProductSchema.query.byName = function (name) {
  return this.find({name: new RegExp(name, 'i')});
};

module.exports = mongoose.model('Product', ProductSchema);