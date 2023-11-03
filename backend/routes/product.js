import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controller/product.js";
const router = express.Router();
import { isAdmin, authMiddleware } from "../middlewares/authHandler.js";

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProducts);
router.get("/:id", authMiddleware, isAdmin, getSingleProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
