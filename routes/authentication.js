var express = require('express')
  , router = express.Router()
  , jwt    = require('jsonwebtoken')
  , bcrypt = require('bcrypt')
  , User = require('../controllers').User;

var configs = require('../configs');
var utils = require('../lib/utils');


router.get('/', function (req, res) {
  res.json({
    code: 200,
    error: 'authentication'  
  });
});

router.post('/', function(req, res, next) {

  User.findAllByName(req.body.name, function(err, user) {
    if (err) {
      var errMsg = 'get user error:' + err.toString() + '!';
      return next(utils.errors.ISE(errMsg));
    }
    if (!user) {
      var errMsg = 'User not found!';
      return res.json(utils.errors.NotFound(errMsg));
    }

    bcrypt.compare(req.body.password, user.password, function (err, compared) {
      if (!compared){
        var errMsg = 'Authentication failed. Wrong password.';
        return res.json(utils.errors.Unauthorized(errMsg));
      }


      var token = jwt.sign(user, configs.secret, {
        expiresIn: '24h'
      });

      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });


    });
  });

});

router.get('/:id', function(req, res) {
  
  res.json({
    code: 200,
    error: 'authentication'
  });

});

module.exports = router
