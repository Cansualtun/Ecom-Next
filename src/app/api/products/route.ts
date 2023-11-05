import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/configs/dbConfig";
import Product from "@/models/productModel";
import { validateJWT } from "@/helpers/validateJWT";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    // check if category already exists
    const reqBody = await request.json();
    const productExists = await Product.findOne({
      name: reqBody.name,
    });
    if (productExists) {
      throw new Error("Category already exists");
    }
    reqBody.createdBy = userId;
    const category = new Product(reqBody);
    await category.save();

    return NextResponse.json({
      message: "Product Succesffully Created!",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await validateJWT(request);
    const products = await Product.find().populate("createdBy", "name");
    return NextResponse.json({
      data: products,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
