const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack);

  res.status(500).json({
    success: false,
    error: error.message
  });
};

module.exports = errorHandler;
