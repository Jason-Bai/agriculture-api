var UserModel = require('../models').UserModel
  , crypto = require('crypto')
	, utils = require('../lib/utils');

hash = function (password) {
  return crypto.createHash('sha1').update(password).digest('base64')
};

// login
exports.signin = function (req, res, next) {

  var password = utils.sha1Hash(req.params.name, 'salt');

  UserModel.findOne({name: req.params.name}, function (err, u) {
    if (err) {
			return next(err);
		}
    if (u.password == password) {
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
  var users = new UserModel({
    name: req.params.name,
    password: utils.sha1Hash(req.params.password, 'salt'),
  });
  users.save(function (err, u) {
		if (err) {
			return next(err);
		}
		res.json({code: 200});
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
exports.detail = function (req, res, next) {
  findUserProfile({id: req.params.userId}, function (docs) {
    res.json(docs);
  });
};

// Get all users
exports.findAll = function (req, res, next) {
  UserModel.find({user_id: req.params.user_id})
		.sort({created_at: -1})
		.paginate(req.params.page || 1, req.params.pre_count || 10, function (err, data, total) {
      if (err) {
				return next(err);
			}
			var result = {
				total_num: total,
				data: data || [],
				page_count: Math.ceil(total / (req.params.pre_count || 10))
			};
      res.json(result);
    });
}

// Get all users by a particular user name
exports.findAllByName = function (req, res, next) {
  UserModel.find()
		.byName(req.params.name)
		.exec(function (err, u) {
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
  UserModel.count(req.params || {}, function (err, count) {
    if (err) return next(err);
    res.json({count: count})
  });
};

// create
exports.create = function (req, res, next) {

  var user = new UserModel({
    name: req.params.name,
		pass: req.params.password
  });

  user.save(function (err, user) {
		if (err) {
			return res.status(500).send(err);
		}
		return res.json(user);
  });

};

exports.update = function (req, res, next) {

	res.json({ok: true, msg: 'updated user!'})

};
