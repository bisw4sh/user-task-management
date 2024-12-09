import { prisma } from "../utils/db";
import { Request, Response } from "express";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const user = req.user as { email: string };
    const data = await prisma.task.findMany({
      where: {
        userId: user.email,
      },
    });

    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving tasks", error: error.message });
  }
};
