var Category = require('../models/category');

exports.create = function (req, res, next) {

  var params = utils.getParams(req);
  var category = new Category({
    name: params.name + Math.random() * 10000
  });
  category.save(function () {
    res.redirect('/categories');
    // res.json({
    //   code: 200,
    //   msg: 'success'
    // });
  });
};

// Get all categories,support page
exports.findAll = function (req, res, next) {
  var p = utils.pagination(req.query);
  Category.find({}).sort({created_at: -1}).paginate(p.page, p.pre_count, function (err, data, total) {
    if (err)  return next(err);
    p.total = total;
    p.data = data || [];
    p.page_total = Math.ceil(total / p.pre_count);
    res.json(p);
  })
};

exports.findOne = function (req, res, next) {
  var obj = {
    id: 'xxxx' + Math.random() * 10000,
    name: '水果'
  };
  return res.json(obj);


  var params = utils.getParams(req);
  Category.findOne({id: params.id}, function (err, c) {
    if (err) next(err);
    res.json(c);
  })
}
