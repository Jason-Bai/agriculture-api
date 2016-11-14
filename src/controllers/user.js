var UserModel = require('../models').UserModel
  , utils = require('../lib/utils');

function findUserProfile(params, callback) {
  UserModel.findOne({ id: params.userId }, function (err, docs) {
    if (err) return next(err)
    callback(docs);
  })
}

exports.findUserProfile = findUserProfile;

// get user info
exports.detail = function (req, res, next) {
  findUserProfile({ id: req.params.userId }, function (docs) {
    res.json(docs);
  });
};

// Get all users
exports.findAll = function (req, res, next) {
  UserModel.find({})
    .sort({ created_at: -1 })
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
  UserModel.find({ user: user }, cb)
}

// authenticate
exports.authenticate = function (email, password, cb) {
  UserModel.find({ email: email }, function (err, docs) {
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
  UserModel.update({ id: id }, { password: hash(password) }, function (err, affected) {
    if (err) return cb(err)
    cb(null, affected > 0)
  })
};


// count
exports.count = function (req, res, next) {
  UserModel.count(req.params || {}, function (err, count) {
    if (err) return next(err);
    res.json({ count: count })
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

  res.json({ ok: true, msg: 'updated user!' })

};


exports.signin = function (req, res, next) {

  UserModel.find({name: req.params.name}, function(err, user) {
    if (err) {
      var errMsg = 'get user error:' + err.toString() + '!';
      return next(utils.errors.ISE(errMsg));
    }
    if (!user) {
      var errMsg = 'Users not found!';
      return res.json(utils.errors.NotFound(errMsg));
    }

    utils.bcrypt.compare(req.params.password, user.password, function (err, compared) {
      if (!compared){
        var errMsg = 'Authentication failed. Wrong password.';
        return res.json(utils.errors.Unauthorized(errMsg));
      }


      var token = jwt.sign(user, configs.secret, {
        expiresIn: '24h'
      });

      var expiredAt = moment().add(1, 'days').millisecond();

      res.json({
        expiredAt: expiredAt,
        access_token: token
      });

    });
  });

};

// register
exports.signup = function (req, res, next) {

  var params = utils.getParams(req);

  var user = new UserModel({
    name: params.name,
    password: params.password
  });

  user.save(function (err, u) {
    if (err) {
      return next(err);
    }
    res.json(u);
  })
};
