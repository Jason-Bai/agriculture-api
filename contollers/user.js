var User = require('./user')
  , crypto = require('crypto');

hash = function (password) {
  return crypto.createHash('sha1').update(password).digest('base64')
};

// login
exports.signin = function (req, res, next) {
  var body = utils.getParams(req);
  var pass = utils.sha1Hash(body.name, 'salt');

  User.findOne({name: body.name}, function (err, u) {
    if (err) next(err);
    if (u.pass == pass) {
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
  var user = new User({
    name: body.name,
    pass: utils.sha1Hash(body.pass, 'salt'),
  });
  user.save(function (err, u) {
    res.json(u);
  })
}

// Create new user in your database and return its id
exports.create = function (name, pass, cb) {
  var user = new User({
    name: name,
    pass: hash(pass),
  });
  // user.save(cb);
  user.save(user, cb)
}

// Get a particular user
exports.get = function (id, cb) {
  User.find({id: id}, function (err, docs) {
    if (err) return cb(err)
    cb(null, docs[0])
  })
}

// Get all users
exports.findAll = function (cb) {
  User.find({}, cb)
}

// Get all users by a particular user name
exports.findAllByName = function (name, cb) {
  User.find().byName(name).exec(cb);
};

// Get all users by a particular user
exports.findAllByUser = function (user, cb) {
  User.find({user: user}, cb)
}

// authenticate
exports.authenticate = function (email, password) {
  User.find({email: email}, function (err, docs) {
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
  User.update({id: id}, {password: hash(password)}, function (err, affected) {
    if (err) return cb(err)
    cb(null, affected > 0)
  })
}