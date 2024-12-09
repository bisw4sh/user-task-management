import { prisma } from "../utils/db";
import { NextFunction, Request, Response } from "express";

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  const user = req.user as { email: string };
  const { title, description, dueDate, status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        status,
        userId: user.email,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};
