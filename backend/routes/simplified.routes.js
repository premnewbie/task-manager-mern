// backend/routes/simplified.routes.js
import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getTasks, createTask, getTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import { getUser, login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/auth/user", protectRoute, getUser);

router.get("/auth/tasks", protectRoute, getTasks);

router.post("/auth/task-create", protectRoute, createTask);

router.get("/auth/task-get/:taskId", protectRoute, getTask);
router.put("/auth/task-update/:taskId", protectRoute, updateTask);
router.delete("/auth/task-delete/:taskId", protectRoute, deleteTask);

export default router;