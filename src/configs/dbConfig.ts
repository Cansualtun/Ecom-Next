import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_url as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
