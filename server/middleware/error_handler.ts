import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = async (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.status || error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ status: statusCode, message });
};
