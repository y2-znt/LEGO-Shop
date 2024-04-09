import React from "react";
import Header from "../components/Header";

export default function page() {
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto max-xl:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold pt-24 max-sm:text-[1.7rem]">
          Shopping Cart
        </h1>
        <ul className="flex flex-row justify-between mt-24 font-semibold">
          <li>Product</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>Total</li>
        </ul>
      </main>
    </div>
  );
}
