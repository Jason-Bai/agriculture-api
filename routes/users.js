var express = require('express')
  , router = express.Router()
  , Users = require('../controllers/users');

module.exports = router;


/**
 * find all users
 */
router.get('/', Users.findAll);

/**
 * create user
 */
router.post('/', Users.create);

/**
 * update user info
 */
router.put('/:userId', Users.update);

/**
 * get user profile
 */
router.get('/:userId', Users.findProfile);