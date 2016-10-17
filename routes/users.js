var express = require('express')
  , router = express.Router()
  , UserCtrl = require('../controllers').UserCtrl;

/**
 * find all users
 */
router.get('/', UserCtrl.findAll);

/**
 * create user
 */
router.post('/', UserCtrl.create);

/**
 * update user info
 */
router.put('/:userId', UserCtrl.update);

/**
 * get user profile
 */
router.get('/:userId', UserCtrl.findProfile);

module.exports = router;
