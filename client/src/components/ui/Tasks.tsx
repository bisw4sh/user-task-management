import React, { useState, useEffect } from "react";

interface Task {
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "completed" | "overdue";
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "status">>({
    title: "",
    description: "",
    dueDate: new Date(),
  });

  useEffect(() => {
    const currentDate = new Date();
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.status !== "completed" && new Date(task.dueDate) < currentDate
          ? { ...task, status: "overdue" }
          : task
      )
    );
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      ...newTask,
      status: "pending",
    };
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", dueDate: new Date() });
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTaskStatus = (
    id: string,
    status: "pending" | "completed" | "overdue"
  ) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const renderTaskList = (status: "pending" | "completed" | "overdue") => (
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
                {status !== "completed" && (
                  <button
                    onClick={() => updateTaskStatus(task.id, "completed")}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Complete
                  </button>
                )}
                {status === "completed" && (
                  <button
                    onClick={() => updateTaskStatus(task.id, "pending")}
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <form onSubmit={addTask} className="mb-4 space-y-2">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Task description"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={newTask.dueDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setNewTask({ ...newTask, dueDate: new Date(e.target.value) })
          }
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Task
        </button>
      </form>
      <div className="space-y-4">
        {renderTaskList("pending")}
        {renderTaskList("completed")}
        {renderTaskList("overdue")}
      </div>
    </div>
  );
};

export default TaskManager;
