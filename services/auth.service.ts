import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/prismadb";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

export const getSession = async () => {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Couldn't get user session", error);
  }
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, hashedPassword },
  });

  const { hashedPassword: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
