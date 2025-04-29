import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/prisma/prismadb";
import {
  LoginFormData,
  RegisterFormData,
  RegisterFormSchema,
} from "@/schemas/auth.schema";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

export const getSession = async () => {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Couldn't get user session", error);
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

export const authenticate = async (credentials: LoginFormData) => {
  if (!credentials.email || !credentials.password) {
    throw new Error("Invalid email or password");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (!user || !user.hashedPassword) {
    throw new Error("Invalid email or password");
  }

  const isCorrectPassword = await bcrypt.compare(
    credentials.password,
    user.hashedPassword,
  );

  if (!isCorrectPassword) {
    throw new Error("Invalid email or password");
  }

  return user;
};
