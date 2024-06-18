import prisma from "../../../prisma/prismadb";

export default async function getAllUsers() {
  const allUsers = await prisma.user.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return allUsers;
}
