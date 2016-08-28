module.exports = function (opts) {

  return function (req, res, next) {

    var date = Date.now();

    console.log(date + ' : ' + req.method + ' : ' + req.url);

    next();

  };

};