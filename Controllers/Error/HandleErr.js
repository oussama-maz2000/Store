class HandleError extends Error {
  statusCode;
  message;

  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message || "fail";
  }
}
const catch_error = (req, res, next) => {
  const err = new HandleError();
  next(err);
};

const err_handle = (err, req, res, next) => {
  res.status(err.statusCode).json({ err: err.message });
};
module.exports = { HandleError, err_handle, catch_error };
