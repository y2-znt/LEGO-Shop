import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../prisma/prismadb";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user in the database using PrismaClient
  const user = await prisma.user.create({
    data: [name, email, hashedPassword],
  });

  // Return a JSON response with the newly created user object
  return NextResponse.json(user);
}
