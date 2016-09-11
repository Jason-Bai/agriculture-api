var express = require('express')
  , router = express.Router()
  , Users = require('../controllers/users')
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

router.post('/signin', User.signin);

router.post('/signup', User.signup);

var routerSettings = {
  '/api/categories': {
    name: '农业分类API',
    router: require('./category')
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