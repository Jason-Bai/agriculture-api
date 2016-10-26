var express = require('express')
  , router = express.Router()
  , Category = require('../controllers').Category;

/**
 * 1.查询分类
 * 2.控制查询分类等级
 */
router.get('/', Category.findAll);

router.post('/', Category.create);

router.get('/:id', Category.findOne);

