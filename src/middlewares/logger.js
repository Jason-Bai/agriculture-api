module.exports = function (opts) {

  return function (req, res, next) {

    console.log('-----------------------------');
    console.log('URL:', req.url);
    console.log('METHOD:', req.method);
    console.log('QUERIES:', req.query || {});
    console.log('BODY:', req.body || {});
    console.log('-----------------------------');

    next();
  };

};