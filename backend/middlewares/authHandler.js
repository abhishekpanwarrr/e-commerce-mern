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
          console.log("next going");
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
  console.log("email: " + email);
  const adminUser = await User.findOneAndDelete({ email });
  if (adminUser.role !== "admin") {
    console.log("not admin");
    return res.status(300).json({message:"you are not admin"})
  } else {
    next();
  }
});
