var UserModel = require('../models').UserModel
  , configs = require('../configs')
  , utils = require('../lib/utils');

/**
 * 用户详情
 * ignored: 不显示的字段
 */
exports.detail = function (req, res, next) {

  var params = utils.getParams(req),
      attrs = params.attrs;

  if (attrs) {
    attrs += ' -password';
  } else {
    attrs = '-password';
  }

  UserModel.findOne({ id: params.userId }, attrs, function (err, user) {
    if (err) {
      var errMsg = "find user detail error: " + err.toString();
      return next(utils.errors.ISE(errMsg));
    }
    res.json(user);
  });

};

/**
 * 用户列表
 *
 */
exports.findAll = function (req, res, next) {

  var params = utils.getParams(req),
      sort = params.sort,
      attrs = params.attrs;

  if (attrs) {
    attrs += ' -password';
  } else {
    attrs = '-password';
  }

  sort = {
    created_at: -1
  }

  var page = +params.page || 1,
      pre_count = +params.pre_count || 10;


  UserModel.find({}, attrs)
    .sort(sort)
    .paginate(page, pre_count, function (err, data, total) {
      if (err) {
        return next(err);
      }
      var result = {
        total_num: total,
        data: data || [],
        page_count: Math.ceil(total / (pre_count || 10))
      };
      res.json(result);
    });

}

/**
 * 用户列表（用户名查询）
 */
exports.findAllByName = function (req, res, next) {

  var params = utils.getParams(req),
      attrs = params.attrs;

  if (attrs) {
    attrs += ' -password';
  } else {
    attrs = '-password';
  }

  UserModel.find({}, attrs)
    .byName(params.name)
    .exec(function (err, u) {
      if (err) next(err);
      res.json(u);
    });
};

/**
 * 修改密码
 */
exports.changePassword = function (id, password, cb) {
  UserModel.update({ _id: id }, { password: password }, function (err, affected) {
    if (err) return cb(err)
    cb(null, affected > 0)
  })
};


/**
 * 统计用户
 */
exports.count = function (req, res, next) {
  var params = utils.getParams(req);
  UserModel.count(params || {}, function (err, count) {
    if (err) return next(err);
    res.json({ count: count })
  });
};

/**
 * 更新用户
 */
exports.update = function (req, res, next) {

  res.json({ ok: true, msg: 'updated user!' })

};


/**
 * 登录用户
 */
exports.signin = function (req, res, next) {

  var params = utils.getParams(req);

  if (!params.name || !params.password) {
    var errMsg = "name or password incorrect!";
    return next(utils.errors.Unauthorized(errMsg));
  }

  UserModel.findOne({name: params.name}, function(err, user) {
    if (err) {
      var errMsg = 'Find user error:' + err.toString() + '!';
      return next(utils.errors.ISE(errMsg));
    }

    if (!user) {
      var errMsg = 'User not found!';
      return res.json(utils.errors.NotFound(errMsg));
    }

    utils.bcrypt.compare(params.password, user.password, function (err, compared) {
      if (!compared){
        var errMsg = 'Authentication failed. Wrong password.';
        return res.json(utils.errors.Unauthorized(errMsg));
      }

      var token = utils.jwt.sign(user, configs.secret, {
        expiresIn: '24h'
      });

      var expiredAt = utils.moment().add(1, 'days').unix();

      res.json({
        expiredAt: expiredAt,
        access_token: token
      });

    });
  });

};

/**
 * 注册用户
 */
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
    res.status(201).send({created: true});
  })
};

/**
 * 登出用户
 */
exports.signout = function (req, res, next) {
  res.json({ok: true});
}
