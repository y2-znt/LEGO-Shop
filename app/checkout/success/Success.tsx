"use client";

import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { useCartActions } from "@/hooks/useCartActions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function Success() {
  const { clearOnSuccess } = useCartActions();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    clearOnSuccess();
    setShowConfetti(true);
  }, []);

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
          />
          <p>Thank you for your purchase!</p>
          {showConfetti && (
            <Confetti className="pointer-events-none absolute top-0 left-0 z-0 size-full" />
          )}
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
