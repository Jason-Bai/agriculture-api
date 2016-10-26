/**
 * Created by antianlu on 16/9/2.
 */

var express = require('express')
  , router = express.Router()
  , PostsCtrl = require('../controllers').Posts
  , middleware = require('../middlewares/auth');

module.exports = router;

// get all
router.get('/', PostsCtrl.findAll);

// find one
router.get('/:postId', PostsCtrl.detail);

// create a product
router.post('/', PostsCtrl.create);

// update a project
router.patch('/:postId', PostsCtrl.update);

router.del('/:postId', PostsCtrl.deleteOne);