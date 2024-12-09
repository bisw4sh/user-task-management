import { prisma } from "./utils/db";
import { generateSeedData } from "./seedData";
import "dotenv/config";

type TaskT = {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  userId: string;
};

type UserT = {
  email: string;
  password: string;
};

async function main() {
  const { users, tasks }: { users: UserT[]; tasks: TaskT[] } =
    await generateSeedData();

  // Insert users
  for (const user of users) {
    await prisma.users.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: user.password,
      },
    });
  }

  // Insert tasks
  for (const task of tasks) {
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        userId: task.userId,
      },
    });
  }

  console.log("Seeded database with users and tasks.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
