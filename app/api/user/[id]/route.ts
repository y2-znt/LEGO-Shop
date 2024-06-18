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

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();

  // Check if the current user is not authenticated or is not an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await req.json();
  const { id, name } = body;

  // Update the name of the user (stock or out of stock)
  const user = await prisma.product.update({
    where: { id: id },
    data: { name: name },
  });

  // Return a JSON response with the newly created user object
  return NextResponse.json(user);
}
