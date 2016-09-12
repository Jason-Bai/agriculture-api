var express = require('express')
  , router = express.Router()
  , CategoryCtrl = require('../controllers').Categories
  , middleware = require('../middlewares/auth');

/**
 * 1.查询分类
 * 2.控制查询分类等级
 */
router.get('/', CategoryCtrl.findAll);

router.get('/:parentId', CategoryCtrl.findByParentId);

router.post('/', middleware.auth, CategoryCtrl.create);

router.get('/:id', CategoryCtrl.findOne);
