/**
 * Created by antianlu on 16/9/2.
 */
var ProductModel = require('../models/product');


exports.create = function (req, res, next) {
  var product = new ProductModel(params);
  product.user_id = req.user.id;
  product.save(function (err, p) {
    if (err) return next(err);
    res.json(p);
  })
};

// page pageSize
exports.findAll = function (req, res, next) {
  var params = utils.getParams(req),
    p = utils.pagination(req.query);
  ProductModel.find({user_id: params.user_id}).sort({created_at: -1}).paginate(p.page, p.pre_count, function (err, data, total) {
    if (err)  return next(err);
    p.total = total;
    p.data = data || [];
    p.page_total = Math.ceil(total / p.pre_count);
    res.json(p);
  })
};


exports.findOneById = function (req, res, next) {
  var params = utils.getParams(req);
  ProductModel.findOne({_id: params.id}, {}, function (err, p) {
    if (err) return next(err);
    res.json(p);
  })
};

exports.findOneByName = function (req, res, next) {
  var params = utils.getParams(req);
  ProductModel.find({name: new RegExp(params.name)}, function (err, p) {
    if (err) return next(err);
    res.json(p);
  })
};

exports.findByCategory = function (cb) {

};

exports.deleteOne = function (req, res, next) {
  var params = utils.getParams(req);
  ProductModel.remove({id: params.id}, function (err, p) {
    if (err) return next(err);
    res.json({code: 200, msg: 'delete success'});
  })
};

exports.update = function (req, res, next) {
  var params = utils.getParams(req);
  ProductModel.update(params, {upsert: true}, function (err, p) {
    if (err) return next(err);
    res.json({code: 200, msg: 'update success'});
  })
};