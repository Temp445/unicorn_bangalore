import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function PUT(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
  const { userId } = await context.params; 

  try {
    await dbConnect();

    const { role } = await req.json();

    if (!["ADMIN", "USER"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Role updated successfully", user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
