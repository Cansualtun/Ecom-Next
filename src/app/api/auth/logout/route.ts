import { connectDB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    message: "Logout successful",
  });
  // Remove the cookie
  response.cookies.delete("token");
  return response;
}
