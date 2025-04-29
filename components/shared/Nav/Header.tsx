import { getCurrentUser } from "@/pages/api/auth/getCurrentUser";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import CartQuantity from "./CartQuantity";
import UserMenu from "./UserMenu";

export default async function Header() {
  const currentUser = await getCurrentUser();

  console.log("Current user: ", currentUser);

  return (
    <div className="fixed z-10 w-full bg-[#FFD300] py-1 text-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between max-xl:px-8">
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
            className="rounded-full p-2 transition-all hover:bg-amber-200"
          >
            <FaRegHeart size={22} />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2 transition-all hover:bg-amber-200"
          >
            <FiShoppingCart size={25} />
            <CartQuantity />
          </Link>
          <UserMenu currentUser={currentUser} />
        </div>
      </nav>
    </div>
  );
}
