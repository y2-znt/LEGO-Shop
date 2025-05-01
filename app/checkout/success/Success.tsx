"use client";

import { Button } from "@/components/ui/shadcn/button";
import { Confetti } from "@/components/ui/shadcn/confetti";
import { clearCart } from "@/redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";

export default function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div>
      <div>
        <p className="text-3xl max-sm:text-[1.7rem] lg:text-4xl">
          Payment Successful!
        </p>
        <div className="m-12 flex flex-col items-center text-3xl font-bold text-gray-700 max-sm:text-[1.7rem]">
          <Image
            src="/assets/success-page.png"
            alt=""
            width={1000}
            height={1000}
            className="w-1/2 pb-12 max-sm:w-full"
          ></Image>
          <p>Thank you for your purchase!</p>
          <Confetti className="pointer-events-none absolute top-0 left-0 z-0 size-full" />
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
      </div>
    </div>
  );
}
