var CategoriesModel = require('../models').CategoryModel
		, utils = require('../lib/utils'),
    schema = CategoriesModel.schema.obj,
    conditionKeys = utils._.keys(schema);


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

  var params = utils.getParams(req),
      sort = utils.getSort(params.sort || ''),
      attrs = params.attrs;

  var _params = {},
      _sort = {},
      _attrs = '';

  if (attrs) {
    _attrs += ' -password';
  } else {
    _attrs = '-password';
  }

  _sort = utils._.extend({}, {created_at: -1 }, sort);

  _params = utils.getQueryConditions(params, conditionKeys);

  var page = +params.page || 1,
      pre_count = +params.pre_count || 10;

  CategoriesModel
    .find(_params, _attrs)
    .sort(_sort)
    .paginate(page, pre_count, function (err, data, total) {
      if (err) return next(err);
      var result = {
        total_num: total,
        data: data || [],
        page_count: Math.ceil(total / (pre_count || 10))
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
