import { prisma } from "../utils/db";
import { NextFunction, Request, Response } from "express";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, dueDate } = req.body;
    const user = req.user as { email: string };

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        userId: user.email,
      },
    });

    res.json(task);
  } catch (error) {
    next(error);
  }
};
