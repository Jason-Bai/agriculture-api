/**
 * Created by antianlu on 16/9/2.
 */

var express = require('express')
  , router = express.Router()
  , Product = require('../controllers/product');

module.exports = router;

// get all
router.get('/', Product.findAll);

// find one
router.get('/:productId', Product.findOneById);

// create a product
router.post('/', Product.create);

// update a project
router.put('/:productId', Product.update);

router.del('/:productId', Product.deleteOne);