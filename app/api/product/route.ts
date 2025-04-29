import { getCurrentUser } from "@/pages/api/auth/getCurrentUser";
import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  // Check if the current user is not authenticated or is not an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await req.json();
  const { name, price, inStock, image } = body;

  // Create a new product in the database using PrismaClient
  const product = await prisma.product.create({
    data: {
      name,
      price: parseFloat(price),
      inStock,
      image,
    },
  });

  // Return a JSON response with the newly created user object
  return NextResponse.json(product);
}

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();

  // Check if the current user is not authenticated or is not an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await req.json();
  const { id, inStock } = body;

  // Update the status of the product (stock or out of stock)
  const product = await prisma.product.update({
    where: { id: id },
    data: { inStock: inStock },
  });

  // Return a JSON response with the newly created user object
  return NextResponse.json(product);
}
