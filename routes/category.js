var express = require('express')
  , router = express.Router()
  , Category = require('../controllers').Category;

/**
 * 1.查询分类
 * 2.控制查询分类等级
 */
router.get('/', Category.findAll);

router.post('/', Category.create);

<<<<<<< HEAD:routes/categories.js
router.get('/:id', Category.findOne);
=======
  var name = req.body.name + Math.random() * 10000;

  Category.create(name, function (err, category) {
    res.redirect('/categories');
  });


});

router.get('/:id', function (req, res) {
  var obj = {
    id: 'xxxx' + Math.random() * 10000,
    name: '水果'
  };
  res.json(obj);
});

module.exports = router;
>>>>>>> 153d04f404499dd47cf98b4a55ac464f4cdc9138:routes/category.js
