import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.js";

// Register the user
export const createUser = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        firstName,
        lastName,
        email: req.body.email,
        password: hashedPassword,
      });

      res.status(201).json(newUser);
    } else {
      res.status(409).json({ message: "User already exists", success: false });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
});

// Login the user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res
        .status(403)
        .json({ message: "User does not exist", success: false });
    }
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res
        .status(403)
        .json({ message: "Wrong credentials", success: false });
    }
    return res.status(200).json({
      _id: userExists._id,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      email: userExists.email,
      token: generateToken(userExists._id),
    });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
});

// Fetch all users
export const fetchAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Fetch single user
export const fetchSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findOne({ _id: id });
    singleUser.password = undefined;
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Delete single user
export const deleteSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await User.findByIdAndDelete({ _id: id });
    if (userExists)
      return res
        .status(202)
        .json({ message: "User deleted successfully", success: true });

    if (userExists === null)
      return res.status(400).json({ msg: "No user to delete", success: false });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});
