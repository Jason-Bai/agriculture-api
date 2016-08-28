var express = require('express')
  , router = express.Router();

var utils = require('./utils');


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


router.get('/', function(req, res) {
  res.json(apiResults);
})

module.exports = router