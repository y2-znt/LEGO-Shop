import React from "react";
import Header from "../components/Header";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto max-xl:px-8 font-bold">
        <p className="text-3xl lg:text-4xl font-bold pt-24 max-sm:text-[1.7rem]">
          Shopping Cart
        </p>
        <div className="mx-8 space-y-10">
          <ul className="grid-cols-4 grid pt-12">
            <li>Product</li>
            <li className="pl-20">Price</li>
            <li className="pl-20">Quantity</li>
            <li className="flex justify-self-end">Total</li>
          </ul>
          <div>
            <div className="grid-cols-4 grid items-center">
              <div>
                <Card className="rounded-lg">
                  <CardTitle className="text-xl p-5 font-bold">
                    <p>SHARK NAME</p>
                  </CardTitle>
                  <CardHeader>
                    <figure className="flex justify-center h-32">
                      <Image
                        className="w-24"
                        src="/assets/collection/collection01.png"
                        alt=""
                        width={1000}
                        height={1000}
                      ></Image>
                    </figure>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end py-12 ">
                    <Button className="font-bold bg-transparent text-gray-700">
                      Remove
                      <span className="pl-2">
                        <TrashIcon color="red" />
                      </span>
                    </Button>
                  </CardFooter>
                </Card>
                <div></div>
              </div>
              <div className="pl-20">$6.99</div>
              <div className="flex items-start justify-center w-32 max-w-full border rounded-lg py-3 ml-20 font-bold">
                <button className="px-5">-</button>
                <div>2</div>
                <button className="px-5">+</button>
              </div>
              <div className="justify-self-end">$13.98</div>
            </div>
          </div>
          <div className="flex justify-between items-start border-t pt-8 pl-2">
            <Button className="font-bold border px-8 py-5 text-gray-700 bg-transparent">
              Clear Cart
            </Button>
            <div className="w-72 ">
              <div className="flex justify-between ">
                <span>Subtotal</span>
                <span>Cart totalAmount</span>
              </div>
              <p className="text-sm mx-2">
                Taxes and shipping calculated at checkout
              </p>
              <button className="w-full bg-red-500">Check out</button>
              <div>
                <span>continue shopping</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
