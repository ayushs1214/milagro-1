const errorHandler = require('../utils/errorHandler');

const errorMiddleware = (err, req, res, next) => {
  errorHandler(err, req, res, next);
};

module.exports = errorMiddleware; // This should be a function