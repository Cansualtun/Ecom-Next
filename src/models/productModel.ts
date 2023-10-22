import mongoose from "mongoose";
import { Monsieur_La_Doulaise } from "next/font/google";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    images: [{ type: [], required: true, default: [] }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

// delete old model if exists

if (mongoose.models && mongoose.models["products"])
  delete mongoose.models["products"];
export default mongoose.model("products", productSchema);
