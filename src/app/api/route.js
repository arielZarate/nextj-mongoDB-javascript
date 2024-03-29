import dbConnect from "@/utils/cnn";

import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    //res.status(200).json({ name: "John Doe" });
    await dbConnect();
    return NextResponse.json({
      message: "WELCOME A PET API ",
    });
  } catch (error) {
    throw error.message;
  }
}
