var express = require('express')
  , router = express.Router()
  , User = require('../contollers/user');

var utils = require('../lib/utils');

var apiDesc = [
  {
    name: 'Users',
    desc: 'user operate ..',
    list: [
      {
        name: '登录',
        url: '/signin',
        params: ['name', 'pass']
      },
      {
        name: '注册',
        url: '/signup',
        params: ['name', 'pass']
      }
    ]
  }
];

router.post('/signin', User.signin);

router.post('/signup', User.signup);

var routerSettings = {
  '/categories': {
    name: '农业分类API',
    router: require('./categories')
  },
  '/users': {
    name: '用户API',
    router: require('./users')
  }
};

var routerPaths = utils._.keys(routerSettings);

var apiResults = [];

utils._.each(routerPaths, function (path) {
  var obj = {
    path: path,
    desc: routerSettings[path].name
  };
  apiResults.push(obj);
  router.use(path, routerSettings[path].router);
});


router.get('/', function (req, res) {
  res.json(apiResults);
})

module.exports = router