var UsersModel = require('../models/users')
  , crypto = require('crypto');

hash = function (password) {
  return crypto.createHash('sha1').update(password).digest('base64')
};

// login
exports.signin = function (req, res, next) {
  var body = utils.getParams(req);
  var password = utils.sha1Hash(body.name, 'salt');

  UsersModel.findOne({name: body.name}, function (err, u) {
    if (err) next(err);
    if (u.password == password) {
      // delete u.salt;
      res.json(u);
    } else {
      res.json({
        code: 401,
        msg: 'password wrong'
      })
    }
  })
};

// register
exports.signup = function (req, res, next) {
  var body = utils.getParams(req);
  var users = new UsersModel({
    name: body.name,
    password: utils.sha1Hash(body.password, 'salt'),
  });
  users.save(function (err, u) {
    // res.json(u);
    res.redirect('/api/users');
  })
};


// get user info
exports.findProfile = function (req, res, next) {
  var params = utils.getParams(req);
  UsersModel.findOne({id: params.userId}, function (err, docs) {
    if (err) return next(err)
    res.json(docs);
  })
};

// Get all users
exports.findAll = function (req, res, next) {
  var params = utils.getParams(req),
    p = utils.pagination(req.query);
  UsersModel.find({user_id: params.user_id}).sort({created_at: -1}).paginate(p.page, p.pre_count, function (err, data, total) {
    if (err)  return next(err);
    p.total = total;
    p.data = data || [];
    p.page_total = Math.ceil(total / p.pre_count);
    res.json(p);
  })
}

// Get all users by a particular user name
exports.findAllByName = function (req, res, next) {
  var params = utils.getParams(req);
  UsersModel.find().byName(params.name).exec(function (err, u) {
    if (err) next(err);
    res.json(u);
  });
};

// Get all users by a particular user
exports.findAllByUser = function (user, cb) {
  UsersModel.find({user: user}, cb)
}

// authenticate
exports.authenticate = function (email, password, cb) {
  UsersModel.find({email: email}, function (err, docs) {
    if (err) return cb(err)
    if (docs.length === 0) return cb()

    user = docs[0]

    if (user.password === hash(password)) {
      cb(null, docs[0])
    } else {
      cb()
    }
  })
}

// change password
exports.changePassword = function (id, password, cb) {
  UsersModel.update({id: id}, {password: hash(password)}, function (err, affected) {
    if (err) return cb(err)
    cb(null, affected > 0)
  })
};


// count
exports.count = function (req, res, next) {
  var params = utils.getParams(req);
  UsersModel.count(params, function (err, count) {
    if (err) return next(err);
    res.json({count: count})
  });
};