import CustomError from "../helpers/CustomError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err.message);

  // If error is a known CustomError, respond with its status and message
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // If it's an unknown error, return a generic 500 error
  res.status(500).json({ error: "Internal Server Error" });
};
