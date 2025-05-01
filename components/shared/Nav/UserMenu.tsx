"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@prisma/client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { GoTriangleDown } from "react-icons/go";
import { toast } from "sonner";

interface UserMenuProps {
  currentUser: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: Role;
  } | null;
}

export default function UserMenu({ currentUser }: UserMenuProps) {
  const handleSignOut = () => {
    toast.promise(signOut({ callbackUrl: "/" }), {
      loading: "Logging out...",
      success: "Logged Out Successfully",
      error: "Error signing out",
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center rounded-2xl border-none py-2 pr-6 pl-2 outline-hidden transition-all hover:bg-amber-200">
          {currentUser && currentUser.image ? (
            <Image
              alt=""
              src={currentUser.image}
              width={30}
              height={30}
              className="rounded-full"
            ></Image>
          ) : (
            <Image
              src="/assets/LEGO_Head.png"
              width={30}
              height={30}
              alt=""
            ></Image>
          )}
          <GoTriangleDown className="translate-x-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {currentUser ? (
            <>
              <Link href="/orders">
                <DropdownMenuItem>Your orders</DropdownMenuItem>
              </Link>
              {currentUser.role === "ADMIN" && (
                <Link href="/admin">
                  <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuItem onClick={() => handleSignOut()}>
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <Link href="/login">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
              <Link href="/register">
                <DropdownMenuItem>Register</DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
