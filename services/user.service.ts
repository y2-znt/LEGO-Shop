import prisma from "@/prisma/prismadb";
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

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    const { hashedPassword, ...userWithoutPassword } = currentUser;

    return {
      ...userWithoutPassword,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toString() || null,
    };
  } catch (error) {
    return null;
  }
};
