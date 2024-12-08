import { prisma } from "../utils/db";
import { Request, Response } from "express";

export const createTask = async (req: Request, res: Response) => {
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
};
