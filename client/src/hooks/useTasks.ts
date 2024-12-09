import { useQuery, useMutation, useQueryClient } from "react-query";

export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

type NewTask = Omit<Task, "id" | "status" | "createdAt" | "updatedAt">;

// API calls for tasks
const api = {
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch("/api/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  },
  addTask: async (task: NewTask): Promise<Task> => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    return await response.json();
  },
  updateTask: async (task: Task): Promise<Task> => {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return await response.json();
  },
  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  },
};

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Fetching tasks
  const { data: tasks = [], error } = useQuery<Task[]>("tasks", api.getTasks);

  // Adding a task
  const addTaskMutation = useMutation(api.addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  // Updating a task
  const updateTaskMutation = useMutation(api.updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  // Deleting a task
  const deleteTaskMutation = useMutation(api.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  // Wrapper functions for mutations
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
    error,
    addTask,
    updateTaskStatus,
    deleteTask,
  };
};
