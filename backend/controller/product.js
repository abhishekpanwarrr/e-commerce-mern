import Product from "../models/product.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

// Create new product
export const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    if (newProduct) {
      return res.status(201).json(newProduct);
    }
    return res
      .json(400)
      .json({ message: "Something went wrong", success: false });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

// Update new product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (updatedProduct) {
      return res.status(200).json(updatedProduct);
    }
    return res
      .json(400)
      .json({ message: "Something went wrong", success: false });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

// Update new product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findOneAndDelete({ _id: id });
    if (deleteProduct) {
      return res.status(200).json(deleteProduct);
    }
    return res
      .json(400)
      .json({ message: "Something went wrong", success: false });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

// Fetch single product
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json(product);
    }
    return res
      .status(404)
      .json({ message: "Product not found", success: false });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

// Fetch all product
export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(JSON.parse(queryStr));

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    console.log("page", page, "skip", skip, "limit", limit);
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numberProducts = await Product.countDocuments();
      if (skip >= numberProducts) throw new Error("This page does not exist");
    }
    const products = await query;
    // const products = await Product.find(queryObj);
    if (products) {
      return res.status(200).json(products);
    }
    return res
      .status(404)
      .json({ message: "Products not found", success: false });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});
