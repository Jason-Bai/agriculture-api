var express = require('express')
  , router = express.Router()
<<<<<<< HEAD
  , User = require('../contollers/user');
=======
  , config = require('../configs');
>>>>>>> 153d04f404499dd47cf98b4a55ac464f4cdc9138

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
  '/apicategories': {
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

var apiResults = [];

utils._.each(routerPaths, function (path) {
  var obj = {
    path: path,
    desc: routerSettings[path].name
  };
  apiResults.push(obj);
  router.use(path, routerSettings[path].router);
});


router.get('/api', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + config.service.port +'/api');
});

module.exports = router
