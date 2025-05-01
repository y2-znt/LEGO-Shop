import { getCurrentUser } from "@/services/auth.service";
import { NextResponse } from "next/server";

/**
 * @route GET /api/auth/me
 * @description Get the current authenticated user's session information
 * @returns {User} The current authenticated user or null
 */
export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
