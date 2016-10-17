/**
 * Created by antianlu on 16/9/2.
 */
var PostModel = require('../models').Posts;

exports.create = function (req, res, next) {
  var Post = new PostModel(params);
  Post.user_id = req.user.id;
  Post.save(function (err, p) {
    if (err) return next(err);
    res.json(p);
  })
};

// page pageSize
exports.findAll = function (req, res, next) {
  var params = utils.getParams(req),
    p = utils.pagination(req.query);
  PostModel.find({user_id: params.user_id}).sort({created_at: -1}).paginate(p.page, p.pre_count, function (err, data, total) {
    if (err)  return next(err);
    p.total = total;
    p.data = data || [];
    p.page_total = Math.ceil(total / p.pre_count);
    res.json(p);
  })
};


exports.findOneById = function (req, res, next) {
  var params = utils.getParams(req);
  PostModel.findOne({_id: params.id}, {}, function (err, p) {
    if (err) return next(err);
    res.json(p);
  })
};

exports.findOneByName = function (req, res, next) {
  var params = utils.getParams(req);
  PostModel.find({name: new RegExp(params.name)}, function (err, p) {
    if (err) return next(err);
    res.json(p);
  })
};

exports.findByCategory = function (cb) {

};

exports.deleteOne = function (req, res, next) {
  var params = utils.getParams(req);
  PostModel.remove({id: params.postId}, function (err, p) {
    if (err) return next(err);
    res.json({code: 200, msg: 'delete success'});
  })
};

exports.update = function (req, res, next) {
  var params = utils.getParams(req);
  var postId = params.postId;
  delete params.postId;
  PostModel.update({id: postId}, params, {upsert: true}, function (err, p) {
    if (err) return next(err);
    res.json({code: 200, msg: 'update success'});
  })
};