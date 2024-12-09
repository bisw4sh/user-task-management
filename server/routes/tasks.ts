import { Router } from "express";
import { createTask } from "../controllers/createTask.controller";
import { getTasks } from "../controllers/getTasks.controller";
import { deleteTask } from "../controllers/deleteTask.controller";
import { updateTask } from "../controllers/updateTask.controller";
import { getPaginated } from "../controllers/paginatedTasks.controller";

const router = Router();
router.post("/", createTask);
router.get("/", getTasks);
router.delete("/:taskId", deleteTask);
router.put("/:taskId", updateTask);
router.post("/infinite", getPaginated);

export default router;
