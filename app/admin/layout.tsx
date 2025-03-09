import AdminNav from "../../components/shared/admin/AdminNav";
import { LayoutProps } from "../../types";

export const metadata = {
  title: "LEGO Shop Admin",
  description: "LEGO Shop Admin dashboard",
};

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="-mt-24">
      <AdminNav />
      <main className="pb-24 pt-10">{children}</main>
    </div>
  );
}
