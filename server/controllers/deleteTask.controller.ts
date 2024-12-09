import { prisma } from "../utils/db";
import { NextFunction, Request, Response } from "express";

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params;
    const user = req.user as { email: string };

    const deletedTask = await prisma.task.delete({
      where: {
        id: parseInt(taskId),
        userId: user.email,
      },
    });

    if (deletedTask) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    next(error);
  }
};
