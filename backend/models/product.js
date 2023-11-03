import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      select:false
    },
    images: {
      type: Array,
      default: [],
    },
    color: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    sold: {
      type: Number,
      default: 0,
      select:false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
