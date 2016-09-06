var express = require('express')
  , router = express.Router()
  , User = require('../contollers/user');

module.exports = router;


/**
 * find all users
 */
router.get('/', User.findAll);

/**
 * create user
 */
router.post('/', function (req, res) {
  //var user = req.user.id
  var name = req.body.name;
  var pass = req.body.pass;

  User.create(name, pass, function (err, user) {
    res.redirect('/users')
  });
});

/**
 * update user info
 */
router.put('/:userId', function (req, res) {

});

/**
 * get user profile
 */
router.get('/profile/:id', function (req, res) {
  var obj = {
    id: 'xxxx' + Math.random() * 10000,
    user: '水果姐'
  };
  res.json(obj);
});