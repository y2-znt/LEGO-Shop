export type SafeUser = {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type LayoutProps = {
  children: React.ReactNode;
};
