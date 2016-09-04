var express = require('express')
  , router = express.Router()
  , Category = require('../controllers').Category;


router.get('/', function (req, res) {
  Category.findAll(function (err, categories) {
    res.json(categories);
  });
});

router.post('/', function(req, res) {

  var name = req.body.name + Math.random() * 10000;

  Category.create(name, function (err, category) {
    res.redirect('/categories');
  });


})

router.get('/:id', function(req, res) {
  var obj = {
    id: 'xxxx' + Math.random() * 10000,
    name: '水果'
  };
  res.json(obj);
})

module.exports = router
