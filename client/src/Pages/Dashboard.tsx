import { useInfiniteQuery } from "react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTasks } from "../hooks/useTasks";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  // AlertDialogAction,
  // AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TaskForm as UpdateTaskForm } from "@/components/UpdateTaskForm";
import { useForm, SubmitHandler } from "react-hook-form";

interface TaskFormInputs {
  title: string;
  description: string;
  dueDate: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string; // e.g., "Pending", "Completed"
  createdAt: Date; // ISO 8601 format or a timestamp
  updatedAt: Date; // ISO 8601 format or a timestamp
}

interface TaskPage {
  items: Task[];
  nextPage: number | null;
}

const fetchTasks = async ({
  pageParam = 0,
  status,
}: {
  pageParam: number;
  status: string;
}) => {
  const response = await fetch("/api/tasks/infinite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ currentPage: pageParam, status }),
  });
  return response.json();
};

const TaskList: React.FC<{ status: string }> = ({ status }) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: queryStatus,
  } = useInfiniteQuery({
    queryKey: ["tasks", status], // Status added to queryKey to differentiate queries
    queryFn: ({ pageParam = 0 }) => fetchTasks({ pageParam, status }), // Pass status to fetchTasks
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const { updateTaskStatus, deleteTask } = useTasks();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

  if (queryStatus === "loading") return <div>Loading...</div>;
  if (queryStatus === "error") {
    const errorMessage = (error as Error).message;
    return <div>{errorMessage}</div>;
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-2 capitalize">{status} Tasks</h2>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div>
          <ul className="space-y-2">
            {data?.pages?.map((page: TaskPage, pageIndex: number) =>
              page?.items?.map((task: Task, idx: number) => (
                <li
                  key={task.id || idx + pageIndex}
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
                    <AlertDialog>
                      <AlertDialogTrigger>Edit</AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Edit Task</AlertDialogTitle>
                          <AlertDialogDescription></AlertDialogDescription>
                          <UpdateTaskForm task={task} />
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction> */}
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
      </ScrollArea>
    </>
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
