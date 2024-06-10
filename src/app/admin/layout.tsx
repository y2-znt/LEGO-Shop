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
      <div className="max-w-6xl mx-auto max-xl:px-8 font-bold text-black">
        <AdminNav />
        {children}
      </div>
    </div>
  );
}
