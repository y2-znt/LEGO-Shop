/**
 * @route GET /api/users
 * @description Get all users
 * @returns {User[]} The list of users
 */

import { getAllUsers } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
