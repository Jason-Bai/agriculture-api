var express = require('express')
  , router = express.Router()
  , User = require('../controllers').User;

var utils = require('../lib/utils');


router.get('/', function (req, res) {
  User.findAll(function (err, users) {
    if (err) {
      var errMsg = 'get users errors: ' + err.toString() + '!';
      return res.json(utils.errors.ISE(errMsg));
    }
    res.json(users);
  });
});

router.post('/', function(req, res) {

  var name = req.body.name;
  var pass = req.body.password;

  User.create(name, pass, function (err, user) {
    if (err) {
      var errMsg = 'create user error: ' + err.toString() + '!';
      return res.json(utils.errors.ISE(errMsg));
    }
    res.redirect('/api/users')
  });
})

router.get('/:id', function(req, res) {
  var obj = {
    id: 'xxxx' + Math.random() * 10000,
    user: '水果姐'
  };
  res.json(obj);
})

module.exports = router
