import express from "express";
import {
  createTask,
  deleteTask,
  getMyTask,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router
  .post("/new", isAuthenticated, createTask)
  .get("/mytask", isAuthenticated, getMyTask);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
