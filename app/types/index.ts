import { User } from "@prisma/client";

// prettier-ignore
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type LayoutProps = {
  children: React.ReactNode;
};
