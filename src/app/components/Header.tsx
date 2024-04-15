"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const notificationCount = useSelector(
    (state: any) => state.cart.notificationCount
  );

  return (
    <div className="bg-[#FFD300] fixed w-full z-10">
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
          <Link href="/cart" className="relative">
            <FiShoppingCart size={25} />
            {notificationCount > 0 && (
              <span className="absolute top-2 right-4 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {notificationCount}
              </span>
            )}
          </Link>
          <Link href="/">
            <RiAccountCircleLine size={25} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
