var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , configs = require('./configs');
// connect to mongodb

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || configs.service.port;

// controllers
require('./routes/dispatcher')(app);

/**
 * error process
 */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  var code = err.code || err.status || 500;
  return res.json({code: code, msg: err.message});
});
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