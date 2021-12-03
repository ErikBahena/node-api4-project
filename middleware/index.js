const validateUser = (req, res, next) => {
  if (!req.body.username || !req.body.password)
    res.status(404).json({
      message: "must provide username and password",
    });
  else next();
};

const errorHandling = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  validateUser,
  errorHandling,
};
