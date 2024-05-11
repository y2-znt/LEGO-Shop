"use client";
import { SafeUser } from "@/app/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { GoTriangleDown } from "react-icons/go";
import { toast } from "react-toastify";

type currentUserType = {
  currentUser: SafeUser | null;
};

export default function UserMenu({ currentUser }: currentUserType) {
  const handleSignOut = async () => {
    try {
      toast.success(`Logged Out`, {
        position: "top-left",
        autoClose: 2000,
      });
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="py-2 pr-6 pl-2 hover:bg-amber-200 transition-all flex rounded-2xl border-none outline-none">
          {currentUser && currentUser.image ? (
            <Image
              alt=""
              src={currentUser?.image}
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
          <GoTriangleDown className="translate-x-4 translate-y-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {currentUser ? (
            <>
              <Link href="/orders">
                <DropdownMenuItem>Your orders</DropdownMenuItem>
              </Link>
              <Link href="/admin">
                <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
              </Link>
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
