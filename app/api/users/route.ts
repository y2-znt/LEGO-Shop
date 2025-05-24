import { NextRequest, NextResponse } from "next/server";

import { getAllUsers } from "@/services/user.service";

/**
 * @route GET /api/users
 * @description Get all users
 * @returns {User[]} The list of users
 */
export async function GET(req: NextRequest) {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
