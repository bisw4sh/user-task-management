import bcrypt from "bcrypt";

export async function generateSeedData() {
  const passwords = await Promise.all(
    Array(7)
      .fill("password")
      .map((password) => bcrypt.hash(password, 10))
  );

  const users = [
    { email: "spikeystona@gmail.com", password: passwords[0] },
    { email: "biswash@gmail.com", password: passwords[1] },
    { email: "user1@example.com", password: passwords[2] },
    { email: "user2@example.com", password: passwords[3] },
    { email: "user3@example.com", password: passwords[4] },
    { email: "user4@example.com", password: passwords[5] },
    { email: "user5@example.com", password: passwords[6] },
  ];

  const tasks = [
    {
      title: "Task 1",
      description: "Description for Task 1",
      dueDate: new Date(),
      status: "Pending",
      userId: "spikeystona@gmail.com",
    },
    {
      title: "Task 2",
      description: "Description for Task 2",
      dueDate: new Date(),
      status: "Completed",
      userId: "biswash@gmail.com",
    },
    {
      title: "Task 3",
      description: "Description for Task 3",
      dueDate: new Date(),
      status: "Overdue",
      userId: "user1@example.com",
    },
    {
      title: "Task 4",
      description: "Description for Task 4",
      dueDate: new Date(),
      status: "Pending",
      userId: "user2@example.com",
    },
    {
      title: "Task 5",
      description: "Description for Task 5",
      dueDate: new Date(),
      status: "Completed",
      userId: "user3@example.com",
    },
    {
      title: "Task 6",
      description: "Description for Task 6",
      dueDate: new Date(),
      status: "Overdue",
      userId: "user4@example.com",
    },
    {
      title: "Task 7",
      description: "Description for Task 7",
      dueDate: new Date(),
      status: "Pending",
      userId: "user5@example.com",
    },
  ];

  return { users, tasks };
}
