"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdDns, MdLibraryAdd } from "react-icons/md";
import AdminNavItem from "./AdminNavItem";

export default function AdminNav() {
  const pathname = usePathname(); // Get the current path "/admin"
  return (
    <div className="top-20 w-full border-b-[1px] bg-white pt-24 shadow-sm">
      <div className="flex flex-row flex-nowrap items-center justify-between gap-4 overflow-x-auto px-4 md:justify-center md:gap-12 md:px-0">
        <Link href="/admin">
          <AdminNavItem
            label="Summary"
            icon={MdDashboard}
            selected={pathname === "/admin"}
          />
        </Link>
        <Link href="/admin/add-products">
          <AdminNavItem
            label="AddProducts"
            icon={MdLibraryAdd}
            selected={pathname === "/admin/add-products"}
          />
        </Link>
        <Link href="/admin/manage-products">
          <AdminNavItem
            label="ManageProducts"
            icon={MdDns}
            selected={pathname === "/admin/manage-products"}
          />
        </Link>
      </div>
    </div>
  );
}
