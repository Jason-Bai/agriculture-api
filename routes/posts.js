/**
 * Created by antianlu on 16/9/2.
 */

var express = require('express')
  , router = express.Router()
  , Posts = require('../controllers/posts');

module.exports = router;

// get all
router.get('/', Posts.findAll);

// find one
router.get('/:articleId', Posts.findOneById);

// create a product
router.post('/', Posts.create);

// update a project
router.put('/:articleId', Posts.update);

router.del('/:articleId', Posts.deleteOne);