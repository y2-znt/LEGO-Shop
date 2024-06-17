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
    // Delete the product from the db
    const product = await prisma.product.delete({
      where: { id },
    });

    // Return a JSON response with the deleted product object
    return NextResponse.json(product);
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
  const { id, price, name } = body;

  // Update the name and price
  const product = await prisma.product.update({
    where: { id: id },
    data: { name: name, price: parseFloat(price) },
  });

  // Return a JSON response with the newly created user object
  return NextResponse.json(product);
}
