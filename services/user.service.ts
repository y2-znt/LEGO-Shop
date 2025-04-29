import prisma from "@/prisma/prismadb";

export default async function getAllUsers() {
  const allUsers = await prisma.user.findMany({
    orderBy: [{ role: "desc" }, { updatedAt: "desc" }],
  });

  return allUsers;
}

export const updateUser = async (
  id: string,
  data: { name?: string; role?: "USER" | "ADMIN" },
) => {
  const { name, role } = data;

  return prisma.user.update({
    where: { id },
    data: {
      name,
      role,
    },
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
