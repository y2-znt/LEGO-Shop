import prisma from "../../../prisma/prismadb";

export default async function getAllUsers() {
  const allUsers = await prisma.user.findMany({
    orderBy: [{ role: "desc" }, { updatedAt: "desc" }],
  });

  return allUsers;
}
