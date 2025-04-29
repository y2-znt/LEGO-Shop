import prisma from "@/prisma/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, hashedPassword },
  });

  const { hashedPassword: _, ...userWithoutPassword } = user;

  return NextResponse.json(userWithoutPassword);
}
