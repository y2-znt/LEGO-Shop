import React from "react";
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "LEGO Shop Admin",
  description: "LEGO Shop Admin dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="mx-auto max-w-6xl font-bold text-black max-xl:px-8">
        <AdminNav />
        {children}
      </div>
    </div>
  );
}
