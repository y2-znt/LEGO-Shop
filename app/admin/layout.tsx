import AccesDenied from "@/features/admin/components/AccesDenied";
import AdminNav from "@/features/admin/components/AdminNav";
import { getCurrentUser } from "@/services/auth.service";
import { ReactNode } from "react";

export const metadata = {
  title: "LEGO Shop Admin",
  description: "LEGO Shop Admin dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccesDenied title="Oops! Acces denied" />;
  }

  return (
    <div className="-mt-24">
      <AdminNav />
      <main className="pt-10 pb-24">{children}</main>
    </div>
  );
}
