import bcrypt from "bcrypt";

export async function generateSeedData() {
  // Hashing the password for the seed users
  const passwords = await Promise.all(
    Array(7)
      .fill("password")
      .map((password) => bcrypt.hash(password, 10))
  );

  // Creating user data
  const users = [
    { email: "spikeystona@gmail.com", password: passwords[0] },
    { email: "biswash@gmail.com", password: passwords[1] },
    { email: "user1@example.com", password: passwords[2] },
    { email: "user2@example.com", password: passwords[3] },
    { email: "user3@example.com", password: passwords[4] },
    { email: "user4@example.com", password: passwords[5] },
    { email: "user5@example.com", password: passwords[6] },
  ];

  // Array of possible statuses
  const statuses = ["Completed", "Pending", "Overdue"];

  // Generate 100 tasks for user "spikeystona@gmail.com"
  const tasks = Array(100)
    .fill(null)
    .map((_, index) => {
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      return {
        title: `Task ${index + 1}`,
        description: `Description for Task ${index + 1}`,
        dueDate: new Date(),
        status: randomStatus,
        userId: "spikeystona@gmail.com", // Assigning the user ID as the seed user
      };
    });

  return { users, tasks };
}
