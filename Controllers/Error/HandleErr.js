class HandleError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleCastError = (err) => {
  let message = `invalid ${err.path} :${err.value}`;
  return new HandleError(message, 402);
};
const devErr = (err, res) => {

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
const prodErr = (err, res) => {
  //  operational erro sending to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // programming error sending to developer
  } else {
    res.status(500).json({
      status: "error",
      message: "somethign happend wrong",
    });
  }
};

const golobaleEroor = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV == "development") {
    devErr(err, res);
  } else if (process.env.NODE_ENV == "production") {
    let error = { ...err };

    if (error.name === "CastError") {error = handleCastError(error);
    console.log(error);
    }
    prodErr(error, res);
  }
};
module.exports = { HandleError, golobaleEroor };
