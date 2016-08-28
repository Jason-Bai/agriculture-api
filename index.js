var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var middlewares = require('./middlewares');
var configs     = require('./configs');
var db          = require('./lib/db');
var controllers = require('./controllers');

// connect to mongodb
db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || configs.service.port;

var router = express.Router();

// middlewares
middlewares.forEach(function middleware(middleware) {
  app.use('/api', middleware());
});

// controllers
app.use(require('./controllers'));

/*
router.get('/', function (req, res) {
  res.json({message: 'hooray! welcome to our app!'});
});

router.route('/categories')
  .post(function (req, res) {
    console.log(req.body);
    var name = req.body.name;
    var obj = {
      id: 'xxxx' + Math.random() * 10000,
      name: name
    }
    var result = {
      code: 201,
      message: 'created successfully',
      data: obj
    };
    res.json(result);
  })
  .get(function (req, res) {
    var categories = [{
      id: 'xxxx',
      name: '水果'
    }];
    var result = {
      code: 200,
      message: '200 ok',
      data: categories,
      total_num: 1000
    }
    res.json(result);
  });

app.use('/api', router);

*/

app.listen(port);
console.log('Magic happens on port ' + port);