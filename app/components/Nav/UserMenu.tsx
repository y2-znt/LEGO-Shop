"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GoTriangleDown } from "react-icons/go";
import { toast } from "sonner";
import { SafeUser } from "../../types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/shadcn/dropdown-menu";

type currentUserType = {
  currentUser: SafeUser | null;
};

export default function UserMenu({ currentUser }: currentUserType) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();

      const promise = (): Promise<void> =>
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
