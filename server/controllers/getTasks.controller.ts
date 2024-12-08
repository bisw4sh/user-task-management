import { prisma } from "../utils/db";
import { Request, Response } from "express";

export const getTasks = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search, status } = req.query;
  const user = req.user as { email: string };
  const tasks = await prisma.task.findMany({
    where: {
      userId: user.email,
      ...(search && { title: { contains: search, mode: "insensitive" } }),
      ...(status && { status }),
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    orderBy: { dueDate: "asc" },
  });

  res.json(tasks);
};
