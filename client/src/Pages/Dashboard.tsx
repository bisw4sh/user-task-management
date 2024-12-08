import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTasks } from "../hooks/useTasks";
import { Input } from "@/components/ui/input";

interface TaskFormInputs {
  title: string;
  description: string;
  dueDate: string;
}

const TaskList: React.FC<{ status: string }> = ({ status }) => {
  const { tasks, updateTaskStatus, deleteTask } = useTasks();

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 capitalize">{status} Tasks</h2>
      <ul className="space-y-2">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-2">
                {status !== "Completed" && (
                  <button
                    onClick={() => updateTaskStatus(task.id, "Completed")}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Complete
                  </button>
                )}
                {status === "Completed" && (
                  <button
                    onClick={() => updateTaskStatus(task.id, "Pending")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Undo
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInputs>();

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    addTask({
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
    });
    reset();
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

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

const Dashboard: React.FC = () => {
  const { tasks } = useTasks();

  useEffect(() => {
    const currentDate = new Date();
    tasks.forEach((task) => {
      if (task.status !== "Completed" && new Date(task.dueDate) < currentDate) {
        task.status = "Overdue";
      }
    });
  }, [tasks]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm />
      <div className="space-y-4">
        <TaskList status="Pending" />
        <TaskList status="Completed" />
        <TaskList status="Overdue" />
      </div>
    </div>
  );
};

export default Dashboard;
