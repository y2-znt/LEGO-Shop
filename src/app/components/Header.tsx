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
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GoTriangleDown } from "react-icons/go";
import { RiAccountCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function Header() {
  const { cartTotalQuantity } = useSelector((state: any) => state.cart);

  return (
    <div className="bg-[#FFD300] text-black fixed w-full z-10">
      <nav className="max-w-7xl mx-auto max-xl:px-8 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/LEGO_logo.png"
            width={60}
            height={60}
            alt="logo"
            className="p-2"
          />
        </Link>
        <div className="flex items-center gap-5 max-sm:gap-3">
          <Link
            href="/favorites"
            className="hover:bg-amber-200 transition-all p-2 rounded-full"
          >
            <FaRegHeart size={22} />
          </Link>
          <Link
            href="/cart"
            className="relative hover:bg-amber-200 transition-all p-2 rounded-full"
          >
            <FiShoppingCart size={25} />
            {cartTotalQuantity > 0 && (
              <span className="absolute top-4 right-5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartTotalQuantity}
              </span>
            )}
          </Link>
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
      </nav>
    </div>
  );
}
