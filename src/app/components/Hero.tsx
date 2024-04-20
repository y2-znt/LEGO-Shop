import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section>
      <div className="min-h-[60vh] flex flex-col lg:gap-0 items-start pt-36">
        <div className="lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold  max-lg:pt-0 max-sm:text-[1.7rem]">
            Lego Shop
          </h1>
        </div>
        <div className="bg-[#FFD300] mt-12 min-h-[40vh] w-full rounded-xl flex justify-between max-lg:flex-col max-lg:items-center max-lg:pb-12">
          <p className="text-4xl text-black lg:text-5xl font-bold p-12">
            You never get too old <br />
            to play,
            <span className="text-red-700"> Right?</span>
          </p>

          <Image
            src="/assets/hero-lego.png"
            width={2000}
            height={2000}
            alt=""
            className="relative w-2/6 -pr-2 rounded- max-lg:rounded-3xl max-lg:w-1/3 max-sm:w-1/2 max-lg:mr-14"
          ></Image>
        </div>
      </div>
    </section>
  );
}
