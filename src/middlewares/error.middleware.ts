
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorMiddleware = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the complete error in console/Kubernetes logs
  console.error("====================================");
  console.error("ERROR OCCURRED");
  console.error("Time:", new Date().toISOString());
  console.error("URL:", req.originalUrl);
  console.error("Method:", req.method);
  console.error("Body:", req.body);
  console.error("Params:", req.params);
  console.error("Query:", req.query);
  console.error("Error:", error);
  console.error("Stack:", error.stack);
  console.error("====================================");

  let statusCode = 500;
  let message = "Internal Server Error";

  console.error(`[ERROR] ${error.message}`, error.stack);

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.message) {
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error:
      process.env.NODE_ENV === "development"
        ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
        : null,
  });
};
