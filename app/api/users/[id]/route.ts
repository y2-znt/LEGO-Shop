import { deleteUser, updateUser } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route PATCH /api/users/:id
 * @description Update a user by ID
 * @param {string} id - The user ID
 * @returns {user} The updated user
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const user = await updateUser(id, body);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * @route DELETE /api/users/:id
 * @description Delete a user by ID
 * @param {string} id - The user ID
 * @returns {user} The deleted user
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await deleteUser(id);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
