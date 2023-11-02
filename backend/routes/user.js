import express from "express";
import { createUser, deleteSingleUser, fetchAllUsers, fetchSingleUser, loginUser } from "../controller/user.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all", fetchAllUsers);
router.get("/:id", fetchSingleUser);
router.delete("/:id", deleteSingleUser);

export default router;
