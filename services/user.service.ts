import prisma from "@/prisma/prismadb";

export default async function getAllUsers() {
  const allUsers = await prisma.user.findMany({
    orderBy: [{ role: "desc" }, { updatedAt: "desc" }],
  });

  return allUsers;
}

export const updateUser = async (
  id: string,
  data: { name?: string; email?: string; role?: "USER" | "ADMIN" },
) => {
  const { name, email, role } = data;

  return prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      role,
    },
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
