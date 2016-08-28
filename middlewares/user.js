var User = require('./user');

module.exports = function (opts) {
  
  return function (req, res, next) {

    req.user = {
      id: 'xxxx' + Math.random() * 10000,
      name: 'boybai',
      email: 'boybai1213@gmail.com'
    };

    next();

    /*
    if (req.session && req.session.user) {
      User.get(req.session.user, function (err, user) {
        if (user) {
          req.user = user
        } else {
          delete req.user
          delete req.session.user
        }

        next()
      })
    } else {
      next()
    }
    */
  }
};