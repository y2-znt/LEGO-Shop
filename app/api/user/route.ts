import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../pages/api/auth/getCurrentUser";
import prisma from "../../../prisma/prismadb";

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await req.json();
  const { id, role } = body;

  const user = await prisma.user.update({
    where: { id: id },
    data: { role: role },
  });

  return NextResponse.json(user);
}
