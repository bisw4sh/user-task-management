import { prisma } from "../utils/db";
import { NextFunction, Request, Response } from "express";

export const getPaginated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPage, status } = req.body; // Get status from request body
    const page = parseInt(currentPage) || 0;
    const limit = 30;

    // Find tasks by status
    const tasks = await prisma.task.findMany({
      where: {
        status: status, // Filter tasks by status
      },
      skip: page * limit,
      take: limit,
    });

    const totalTasks = await prisma.task.count({
      where: {
        status: status, // Count only tasks with the given status
      },
    });

    const hasNextPage = page * limit + limit < totalTasks;

    res.json({
      items: tasks,
      nextPage: hasNextPage ? page + 1 : null,
    });
  } catch (error) {
    next(error);
  }
};
