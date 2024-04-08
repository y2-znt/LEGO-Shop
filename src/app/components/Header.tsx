import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoBag } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

export default function Header() {
  return (
    <div className="bg-[#FFD300] fixed w-full z-10">
      <nav className=" max-w-7xl mx-auto max-xl:px-8 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/LEGO_logo.png"
            width={60}
            height={60}
            alt="logo"
            className="p-2"
          ></Image>
        </Link>
        <div className="flex items-center gap-5 max-sm:gap-3">
          <Link href="/cart">
            <IoBag size={25} />
          </Link>
          <Link href="/">
            <MdAccountCircle size={25} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
