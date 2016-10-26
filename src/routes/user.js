var express = require('express')
  , router = express.Router()
  , UserCtrl = require('../controllers').UserCtrl;

/**
 * 用户列表
 */
router.get('/', UserCtrl.findAll);

/**
 * 创建用户
 */
router.post('/', UserCtrl.signup);

/**
 * 更新用户
 */
router.patch('/:userId', UserCtrl.update);

/**
 * 用户详情
 */
router.get('/:userId', UserCtrl.detail);


module.exports = router;
