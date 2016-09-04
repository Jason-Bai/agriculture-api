var express = require('express')
  , router = express.Router()
  , config = require('../configs');

var utils = require('../lib/utils');


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
