"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GoTriangleDown } from "react-icons/go";
import { toast } from "sonner";

type currentUserType = {
  currentUser: SafeUser | null;
};

export default function UserMenu({ currentUser }: currentUserType) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();

      //@ts-ignore
      const promise = (): Promise =>
        //@ts-ignore
        new Promise((resolve) => setTimeout(() => resolve(), 2000));

      await toast.promise(promise(), {
        loading: "Logging out...",
        success: "Logged Out Successfully",
        error: "Error",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  // Redirection to home page
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center rounded-2xl border-none py-2 pl-2 pr-6 outline-none transition-all hover:bg-amber-200">
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
          <GoTriangleDown className="translate-x-4" />
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
