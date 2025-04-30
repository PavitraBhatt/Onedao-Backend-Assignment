const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  console.error('Error 💥:', err);

  if (!err.statusCode) err.statusCode = 500;
  if (!err.status) err.status = 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'Something went wrong!',
  });
};