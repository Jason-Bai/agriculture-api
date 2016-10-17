var UserModel = require('../models').UserModel
  , crypto = require('crypto');

hash = function (password) {
  return crypto.createHash('sha1').update(password).digest('base64')
};

// login
exports.signin = function (req, res, next) {
  var body = utils.getParams(req);
  var password = utils.sha1Hash(body.name, 'salt');

  UserModel.findOne({name: body.name}, function (err, u) {
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
  var users = new UserModel({
    name: body.name,
    password: utils.sha1Hash(body.password, 'salt'),
  });
  users.save(function (err, u) {
    // res.json(u);
    res.redirect('/api/users');
  })
};

function findUserProfile(params, callback) {
  UserModel.findOne({id: params.userId}, function (err, docs) {
    if (err) return next(err)
    callback(docs);
  })
}

exports.findUserProfile = findUserProfile;

// get user info
exports.findProfile = function (req, res, next) {
  var params = utils.getParams(req);
  findUserProfile({id: params.userId}, function (docs) {
    res.json(docs);
  });
};

// Get all users
exports.findAll = function (req, res, next) {
  var params = utils.getParams(req),
    p = utils.pagination(req.query);
  UserModel.find({user_id: params.user_id}).sort({created_at: -1}).paginate(p.page, p.pre_count, function (err, data, total) {
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
  UserModel.find().byName(params.name).exec(function (err, u) {
    if (err) next(err);
    res.json(u);
  });
};

// Get all users by a particular user
exports.findAllByUser = function (user, cb) {
  UserModel.find({user: user}, cb)
}

// authenticate
exports.authenticate = function (email, password, cb) {
  UserModel.find({email: email}, function (err, docs) {
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
  UserModel.update({id: id}, {password: hash(password)}, function (err, affected) {
    if (err) return cb(err)
    cb(null, affected > 0)
  })
};


// count
exports.count = function (req, res, next) {
  var params = utils.getParams(req);
  UserModel.count(params, function (err, count) {
    if (err) return next(err);
    res.json({count: count})
  });
};

// create
exports.create = function (req, res, next) {

  var params = utils.getParams(req);

  var user = new UserModel({
    name: params.name,
		pass: params.password
  });

  user.save(function (err, model) {
		if (err) {
			return res.status(500).send(err);
		}
		return res.json(model);
  });

};

exports.update = function (req, res, next) {

	res.json({ok: true, msg: 'updated user!'})

};
