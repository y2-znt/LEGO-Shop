import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <div className="min-h-[60vh] flex flex-col gap-14 lg:gap-0 items-start pt-28">
        <div className="lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold  pt max-lg:pt-0 max-sm:text-[1.7rem]">
            Lego Shop
          </h1>
        </div>
        <div className="bg-[#FFD300] mt-12 min-h-[40vh] w-full rounded-xl">
          <p className="text-4xl text-black lg:text-5xl font-bold  text-justify p-14">
            You never get too old <br />
            to play,
            <span className="text-red-700"> Right?</span>
          </p>
        </div>
      </div>
    </section>
  );
}
