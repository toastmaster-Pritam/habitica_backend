import express from "express";
import {
  getAllUser,
  getUserbyId,
  registerUser,
  loginUser,
  getMyProfile,
  logoutUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router
  .get("/all", getAllUser)
  .post("/new", registerUser)
  .post("/login", loginUser)
  .get("/me", isAuthenticated, getMyProfile)
  .get("/logout", logoutUser)
  .get("/:id", getUserbyId);

export default router;
