var User = require('../models').User;

// Create new user in your database and return its id
exports.create = function (name, pass, cb) {
  var user = new User({
    name: name,
    password: pass,
    admin: false
  });

  user.save(cb)
}

// Get a particular user
exports.get = function (id, cb) {
  User.find({ _id: id }, function (err, docs) {
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
  User.findOne({ name: name }).exec(cb);
};

// change password
exports.changePassword = function (id, password, cb) {
  User.update({ id: id }, { password: password }, function (err, affected) {
    if (err) return cb(err)
    cb(null, affected > 0)
  })
}