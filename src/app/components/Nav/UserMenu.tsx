"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { GoTriangleDown } from "react-icons/go";
import { RiAccountCircleLine } from "react-icons/ri";

export default function UserMenu() {
  return (
    <div>
      {" "}
      <DropdownMenu>
        <DropdownMenuTrigger className="py-2 pr-6 pl-2 hover:bg-amber-200 transition-all flex rounded-2xl border-none outline-none">
          <RiAccountCircleLine size={25} />
          <GoTriangleDown className="translate-x-4 translate-y-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/orders">
            <DropdownMenuItem>Your orders</DropdownMenuItem>
          </Link>
          <Link href="/admin">
            <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer"
          >
            Logout
          </DropdownMenuItem>{" "}
          <Link href="/login">
            <DropdownMenuItem>Login</DropdownMenuItem>
          </Link>
          <Link href="/register">
            <DropdownMenuItem>Register</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
