import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { register } from "@/services/auth.service";

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @returns {user} The registered user
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await register(body);
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
