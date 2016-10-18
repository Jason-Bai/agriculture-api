var CategoriesModel = require('../models').CategoryModel;

exports.create = function (req, res, next) {
  var category = new CategoriesModel({
    name: req.params.name
  });
  category.save(function (err, category) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(c);
  });
};

// Get all categories,support page
exports.findAll = function (req, res, next) {
  CategoriesModel
    .find(req.params || {})
    .sort({created_at: -1})
    .paginate(req.params.page || 1, req.params.pre_count || 10, function (err, data, total) {
      if (err) return next(err);
      var result = {
        total_num: total,
        data: data || [],
        page_count: Math.ceil(total / (req.params.pre_count || 10))
      };
      res.json(result);
    });
};

exports.detail = function (req, res, next) {
  CategoriesModel.findOne({id: req.params.id}, function (err, c) {
    if (err) next(err);
    res.json(c);
  })
};

exports.update = function (req, res, next) {
  res.json({updated: true});
}