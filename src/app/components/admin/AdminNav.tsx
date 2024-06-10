"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdDns, MdLibraryAdd } from "react-icons/md";
import AdminNavItem from "./AdminNavItem";

export default function AdminNav() {
  const pathname = usePathname(); // Get the current path "/admin"
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4 bg-white">
      <div className="flex flex-row items-center justify-between md:justify-center md:gap-12 gap-4 overflow-x-auto flex-nowrap px-4 md:px-0">
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
            selected={pathname === "/add-products"}
          />
        </Link>
        <Link href="/admin/manage-products">
          <AdminNavItem
            label="ManageProducts"
            icon={MdDns}
            selected={pathname === "/manage-products"}
          />
        </Link>
      </div>
    </div>
  );
}
