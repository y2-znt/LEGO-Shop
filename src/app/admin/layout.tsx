import React from "react";

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
      <div className="pt-20 bg-red-400">Admin Nav</div>
      {children}
    </div>
  );
}
