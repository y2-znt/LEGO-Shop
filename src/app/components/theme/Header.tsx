import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideLogIn, ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <div className="bg-[#FFD300]">
      <nav className=" max-w-6xl mx-auto max-xl:px-8 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/LEGO_logo.png"
            width={60}
            height={60}
            alt="logo"
            className="p-2"
          ></Image>
        </Link>
        <div className="flex items-center gap-5 max-sm:gap-3">
          <Link href="/">
            <ShoppingCart />
          </Link>
          <Link href="/">
            <LucideLogIn />
          </Link>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
}
