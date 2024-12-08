import { useQuery, useMutation, useQueryClient } from "react-query";

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

type NewTask = Omit<Task, "id" | "status" | "createdAt" | "updatedAt">;

// This would be replaced with actual API calls in a real application
const mockApi = {
  getTasks: (): Promise<Task[]> =>
    Promise.resolve(JSON.parse(localStorage.getItem("tasks") || "[]")),
  addTask: (task: NewTask): Promise<Task> => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask: Task = {
      ...task,
      id: tasks.length + 1,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return Promise.resolve(newTask);
  },
  updateTask: (task: Task): Promise<Task> => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const index = tasks.findIndex((t: Task) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = { ...task, updatedAt: new Date() };
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    return Promise.resolve(tasks[index]);
  },
  deleteTask: (id: number): Promise<void> => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const filteredTasks = tasks.filter((t: Task) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    return Promise.resolve();
  },
};

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [] } = useQuery<Task[]>("tasks", mockApi.getTasks);

  const addTaskMutation = useMutation(mockApi.addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const updateTaskMutation = useMutation(mockApi.updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const deleteTaskMutation = useMutation(mockApi.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const addTask = (task: NewTask) => {
    addTaskMutation.mutate(task);
  };

  const updateTaskStatus = (id: number, status: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTaskMutation.mutate({ ...task, status });
    }
  };

  const deleteTask = (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  return {
    tasks,
    addTask,
    updateTaskStatus,
    deleteTask,
  };
};
