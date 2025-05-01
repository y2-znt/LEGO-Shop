import prisma from "@/lib/prisma";
import { getSession } from "./auth.service";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: [{ role: "desc" }, { updatedAt: "desc" }],
  });
};

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
