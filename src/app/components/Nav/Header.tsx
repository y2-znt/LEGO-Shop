import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { getCurrentUser } from "../../../pages/api/auth/getCurrentUser";
import CartQuantity from "./CartQuantity";
import UserMenu from "./UserMenu";

export default async function Header() {
  const currentUser = await getCurrentUser();

  console.log("Current user: ", currentUser);

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
            <CartQuantity />
          </Link>
          <UserMenu currentUser={currentUser} />
        </div>
      </nav>
    </div>
  );
}
