import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  searchtask,
  updateTask,
} from "../controllers/task.controller.js";

const router = Router();

router.route("/auth/tasks").get(protectRoute, getTasks);

router.route("/auth/task/search").get(protectRoute, searchtask);

router.route("/auth/task").post(protectRoute, createTask);

router
  .route("/auth/task/:taskId")
  .get(protectRoute, getTask)
  .put(protectRoute, updateTask)
  .delete(protectRoute, deleteTask);

export default router;

