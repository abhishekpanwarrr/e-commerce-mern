import User from "../models/user.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const singleUser = await User.findById(decoded?.id);
        if (singleUser) {
          req.user = singleUser;
          next();
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Not a valid token", success: false });
    }
  } else {
    res.status(500).json({ message: "Not a valid token else", success: false });
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOneAndDelete({ email });
  if (adminUser.isAdmin !== "admin") {
    throw new Error("Not a admin");
  } else {
    next();
  }
});
