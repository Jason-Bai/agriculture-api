var express = require('express')
  , router = express.Router()
  , CategoryCtrl = require('../controllers').CategoryCtrl
  , middleware = require('../middlewares/auth');

/**
 * 分类列表
 */
router.get('/', CategoryCtrl.findAll);

/**
 * 添加分类
 */

router.post('/', CategoryCtrl.create);

/**
 * 更新分类
 */
router.patch('/:categoryId', CategoryCtrl.update);

/**
 * 分类详情
 */
router.get('/:categoryId', CategoryCtrl.detail);

module.exports = router;
