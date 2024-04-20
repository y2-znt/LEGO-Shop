import React from "react";
import Header from "./Header";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export default function Favorites() {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto max-xl:px-8 font-bold">
        <p className="text-3xl lg:text-4xl font-bold pt-24 max-sm:text-[1.7rem]">
          Shopping Cart
        </p>
        <div>Your fav lego!</div>
      </main>
    </div>
  );
}
