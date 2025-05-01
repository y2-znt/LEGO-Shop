import AccesDenied from "@/components/shared/admin/AccesDenied";
import AdminNav from "@/components/shared/admin/AdminNav";
import { getCurrentUser } from "@/services/user.service";
import { LayoutProps } from "@/types";

export const metadata = {
  title: "LEGO Shop Admin",
  description: "LEGO Shop Admin dashboard",
};

export default async function AdminLayout({ children }: LayoutProps) {
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
