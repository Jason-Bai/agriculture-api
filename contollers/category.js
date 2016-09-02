var Category = require('../models/category');

exports.create = function (name, cb) {
  var category = new Category();
  category.name = name;
  category.save(cb);
};

// Get all categories
exports.findAll = function(cb) {
  Category.find({}, cb)
}