import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { Input } from "@/components/ui/input";
import type { Task } from "../hooks/useTasks";

interface TaskFormInputs {
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

interface TaskFormProps {
  task: Task | null;
}

const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return await response.json();
};

export const TaskForm: React.FC<TaskFormProps> = ({ task }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInputs>();
  const [completed, setCompleted] = useState<boolean>(false);

  const mutation = useMutation(updateTask, {
    onSuccess: () => {
      setCompleted(true);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        dueDate: new Date(task.dueDate).toISOString().split("T")[0], // Convert to Date object
        status: task.status,
      });
    }
  }, [task, reset]);

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    if (task) {
      mutation.mutate({
        id: task.id,
        title: data.title,
        description: data.description,
        dueDate: new Date(data.dueDate),
        status: data.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 space-y-2">
      <Input
        {...register("title", { required: "Title is required" })}
        placeholder="Task title"
        className="w-full p-2 border rounded"
      />
      {errors.title && (
        <span className="text-red-500 text-sm">{errors.title.message}</span>
      )}

      <Input
        {...register("description")}
        placeholder="Task description"
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        {...register("dueDate", { required: "Due date is required" })}
        className="w-full p-2 border rounded"
      />
      {errors.dueDate && (
        <span className="text-red-500 text-sm">{errors.dueDate.message}</span>
      )}

      <select
        {...register("status", { required: "Status is required" })}
        className="w-full p-2 border rounded"
      >
        <option value="Pending">Pending</option>
        <option value="Overdue">Overdue</option>
        <option value="Completed">Completed</option>
      </select>
      {errors.status && (
        <span className="text-red-500 text-sm">{errors.status.message}</span>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Updating..." : "Update Task"}
      </button>

      {completed ? (
        <h1 className="text-sky-500 text-center">Completed</h1>
      ) : null}

      {mutation.isError && (
        <p className="text-red-500 text-sm mt-2">
          Failed to update task. Please try again.
        </p>
      )}
    </form>
  );
};
