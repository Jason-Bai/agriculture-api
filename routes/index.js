var express = require('express')
  , router = express.Router()
  , UserCtrl = require('../controllers').UserCtrl
  , config = require('../configs');

module.exports = router;

var apiDesc = [
  {
    name: 'Users',
    desc: 'user operate ..',
    list: [
      {
        name: '登录',
        url: '/signin',
        params: ['name', 'password']
      },
      {
        name: '注册',
        url: '/signup',
        // headers: {Authrozation: 'Bear xxx toekn'},
        params: ['name', 'password']
      }
    ]
  }
];

router.post('/signin', UserCtrl.signin);

router.post('/signup', UserCtrl.signup);

var routerSettings = {
  '/api/categories': {
    name: '农业分类API',
    router: require('./categories')
  },
  '/api/users': {
    name: '用户API',
    router: require('./users')
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


router.get('/api', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + config.service.port + '/api');
});
