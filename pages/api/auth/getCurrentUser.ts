import { getServerSession } from "next-auth";
import prisma from "../../../prisma/prismadb";
import { authOptions } from "./[...nextauth]";

// Get the user session from server side
export async function getSession() {
  try {
    // Get the user session with next-auth function
    return await getServerSession(authOptions);
  } catch (error) {
    console.error(" Couldn't get user session", error);
  }
}

// Get informations about the user connected
export async function getCurrentUser() {
  try {
    // Get information about the current session
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    // Research the user corresponding in the database with primsa
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      // Convert dates createdAt and updatedAt in ISOString format to be compatible with JSON format
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toString() || null,
    };
  } catch (error) {
    return null;
  }
}
