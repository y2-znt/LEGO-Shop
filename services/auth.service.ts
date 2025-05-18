import {
  LoginFormData,
  LoginFormSchema,
  RegisterFormData,
  RegisterFormSchema,
} from "@/features/auth/schemas/auth.schema";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

export const getSession = async () => {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Couldn't get user session", error);
  }
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

export const register = async (data: RegisterFormData) => {
  const { name, email, password } = RegisterFormSchema.parse(data);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, hashedPassword },
  });

  const { hashedPassword: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (data: LoginFormData) => {
  const { email, password } = LoginFormSchema.parse(data);

  if (!email || !password) {
    throw new Error("Invalid email or password");
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.hashedPassword) {
    throw new Error("Invalid email or password");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!isCorrectPassword) {
    throw new Error("Invalid email or password");
  }

  const { hashedPassword: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};
