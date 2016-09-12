var express = require('express')
  , router = express.Router()
  , UsersCtrl = require('../controllers').Users;

module.exports = router;


/**
 * find all users
 */
router.get('/', UsersCtrl.findAll);

/**
 * create user
 */
router.post('/', UsersCtrl.create);

/**
 * update user info
 */
router.put('/:userId', UsersCtrl.update);

/**
 * get user profile
 */
router.get('/:userId', UsersCtrl.findProfile);