import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // check if user exists in db or not
    const user = await userModel.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("User does not exist");
    }

    const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credetials");
    }
    // create token
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret!, {
      expiresIn: "7d",
    });
    const response = NextResponse.json({
      message: "Login successful",
      token: token,
    });
    // set token cookie
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
