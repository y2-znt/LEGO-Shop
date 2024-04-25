"use client";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
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
          <Link href="/favorites">
            <FaRegHeart size={22} />
          </Link>
          <Link href="/cart" className="relative">
            <FiShoppingCart size={25} />
            {cartTotalQuantity > 0 && (
              <span className="absolute top-2 right-4 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartTotalQuantity}
              </span>
            )}
          </Link>
          <Link href="/register">
            <RiAccountCircleLine size={25} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
