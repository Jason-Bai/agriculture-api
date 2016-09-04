var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');

var jwt    = require('jsonwebtoken');

var middlewares = require('./middlewares');
var configs     = require('./configs');
var db          = require('./lib/db');

// connect to mongodb
db.connect();

// settings
app.set('superSecret', configs.secret);

// middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// controllers
// require('./routes/dispatcher')(app);

/**
 * error process
 
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  var code = err.code || err.status || 500;
  return res.json({code: code, msg: err.message});
});
*/

var port = process.env.PORT || configs.service.port;


// custorm middlewares
middlewares.forEach(function middleware(middleware) {
  app.use('/api', middleware());
});

// routes
app.use(require('./routes'));

app.listen(port);
console.log('Magic happens on port ' + port);
