/**
 * 404
 */
exports.NotFound = function (error) {
  return {
    code: 404,
    error: error
  };
};

/**
 * 400
 */
exports.BadRequest = function (errors) {
  return {
    code: 400,
    errors: errors
  };
};

/**
 * 401
 */
exports.Unauthorized = function (error) {
  return {
    code: 401,
    error: error || 'unauthorized'
  };
};

/**
 * 403
 */
exports.Forbidden = function (error) {
  return {
    code: 403,
    error: error || 'forbidden'
  };
};

/**
 * 404
 */
exports.NotFound = function (error) {
  return {
    code: 404,
    error: error || 'not found!'
  };
};

/**
 * 500
 */
exports.ISE = function (error) {
  return {
    code: 500,
    error: error || 'internal server error'
  }
};