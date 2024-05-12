import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import Header from "./components/Nav/Header";

export default function notfound() {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto max-xl:px-8 font-bold text-black">
        <p className="text-3xl lg:text-4xl pt-24 max-sm:text-[1.7rem]">
          Not Found :/
        </p>
        <div className="flex flex-col m-12 items-center text-3xl font-bold text-gray-700 max-sm:text-[1.7rem]">
          <Image
            src="/assets/favorite-empty.webp"
            alt=""
            width={1000}
            height={1000}
            className="w-1/2 max-sm:w-full pb-12"
          ></Image>
          Page not found :/
          <Link href="/">
            <div className="flex pt-4">
              <Button size="lg" className="text-base">
                <span className="pr-2">
                  <BsArrowLeft />
                </span>
                <p>Return to home page</p>
              </Button>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
