import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = async (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(error.statusCode() || 555)
    .json({ status: error.statusCode, message: error.message });
};
