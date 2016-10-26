var app = require('./src');

var configs = require('./src/configs');

var port = process.env.PORT || configs.service.port;

app.listen(port, function () {
  console.log('Agriculture API running at ' + port + '!');
});