import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../pages/api/auth/getCurrentUser";
import prisma from "../../../../prisma/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const currentUser = await getCurrentUser();

  // Check if the current user is not authenticated or is not an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const { id } = params;

  // Check if the id parameter is provided
  if (!id) {
    return NextResponse.error();
  }

  try {
    // Delete the user from the db
    const user = await prisma.user.delete({
      where: { id },
    });

    // Return a JSON response with the deleted user object
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
}
