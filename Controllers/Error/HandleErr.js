class HandleError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
const handleduplicatefieldDB = (err) => {
  let err_keyvalue = err.keyValue;
  const message = `Duplicatie filed ${err_keyvalue.id}`;
  return new HandleError(message, 501);
};

const handleCastError = (err) => {
  let message = `invalid ${err.path} :${err.value}`;
  return new HandleError(message, 402);
};
const devErr = (err, res) => {
  res.status(err.statusCode).json({
    from: "devErr",
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const golobaleEroor = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV == "development") {
    devErr(err, res);
  }
};
module.exports = { HandleError, golobaleEroor };
