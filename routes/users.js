var express = require('express')
  , router = express.Router()
  , User = require('../models').User;


router.get('/', function (req, res) {
  User.findAll(function (err, users) {
    res.json(users);
  });
});

router.post('/', function(req, res) {
  //var user = req.user.id
  var name = req.body.name;
  var pass = req.body.pass;

  User.create(name, pass, function (err, user) {
    res.redirect('/users')
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
