import express from "express";
import {
  createUser,
  deleteSingleUser,
  fetchAllUsers,
  fetchSingleUser,
  loginUser,
  logout,
  refreshToken,
  resetPassword,
  updatePassword,
} from "../controller/user.js";
import { authMiddleware, isAdmin } from "../middlewares/authHandler.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUser);
router.get("/all", fetchAllUsers);
router.get("/refresh", refreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, fetchSingleUser);
router.delete("/:id", deleteSingleUser);

export default router;
