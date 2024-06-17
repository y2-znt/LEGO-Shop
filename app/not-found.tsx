import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "../components/ui/shadcn/button";

export default function notfound() {
  return (
    <div>
      <main className="mx-auto max-w-6xl font-bold text-black max-xl:px-8">
        <p className="pt-24 text-3xl max-sm:text-[1.7rem] lg:text-4xl">
          Not Found :/
        </p>
        <div className="m-12 flex flex-col items-center text-3xl font-bold text-gray-700 max-sm:text-[1.7rem]">
          <Image
            src="/assets/favorite-empty.webp"
            alt=""
            width={1000}
            height={1000}
            className="w-1/2 pb-12 max-sm:w-full"
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
