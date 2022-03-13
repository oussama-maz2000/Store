class HandleError extends Error {
  statusCode;
  message;
  status;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message || "fail";
  }
}
module.exports = HandleError;
