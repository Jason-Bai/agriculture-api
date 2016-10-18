var express = require('express')
  , router = express.Router()
  , UserCtrl = require('../controllers').UserCtrl
  , config = require('../configs')
	, utils = require('../lib/utils');

var apiDesc = [];

router.post('/signin', UserCtrl.signin);

router.post('/signup', UserCtrl.signup);

var routerSettings = {
  '/api/categories': {
    name: '农业分类API',
    router: require('./category')
  },
  '/api/users': {
    name: '用户API',
    router: require('./user')
  },
  '/api/authenticate': {
    name: '授权API',
    router: require('./authentication')
  }
};

var routerPaths = utils._.keys(routerSettings);

var apisDesc = [];

utils._.each(routerPaths, function (path) {
  var obj = {
    path: path,
    desc: routerSettings[path].name
  };
  apisDesc.push(obj);
  router.use(path, routerSettings[path].router);
});


router.get('/api', function (req, res) {
	res.json(apisDesc);
});

module.exports = router;
