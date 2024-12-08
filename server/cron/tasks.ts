import cron from "node-cron";
import { prisma } from "../utils/db";

cron.schedule("0 * * * *", async () => {
  const overdueTasks = await prisma.task.findMany({
    where: {
      dueDate: { lt: new Date() },
      status: "Pending",
    },
  });

  overdueTasks.forEach((task) => {
    console.log(`Task "${task.title}" is overdue.`);
  });
});
