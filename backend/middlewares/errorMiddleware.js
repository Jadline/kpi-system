//  the error handle middleware will be used in server.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Logs the error for debugging

  res.status(err.statusCode || 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
