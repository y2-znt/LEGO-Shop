import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type LayoutProps = {
  children: React.ReactNode;
};
