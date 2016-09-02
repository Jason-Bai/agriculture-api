/**
 * Created by antianlu on 16/9/2.
 */

var express = require('express')
  , router = express.Router();

module.exports = router;

// get all
router.get('/', function (req, res) {
  res.json({});
});

// find one
router.get('/:productId', function (req, res) {
  res.json({});
});

// create a product
router.post('/', function (req, res) {
  res.json({});
});

// update a project
router.put('/:productId', function (req, res) {
  res.json({});
});

router.delete('/:productId', function (req, res) {
  res.json({});
});