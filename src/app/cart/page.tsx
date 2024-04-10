import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { GoTrash } from "react-icons/go";

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
            <li>PRODUCT</li>
            <li className="pl-32">PRICE</li>
            <li className="pl-32">QUANTITY</li>
            <li className="flex justify-self-end">TOTAL</li>
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
                  <CardFooter className="flex justify-end py-8 ">
                    <Button className="font-bold bg-transparent text-gray-700">
                      Remove
                      <span className="pl-2">
                        <GoTrash color="red" />
                      </span>
                    </Button>
                  </CardFooter>
                </Card>
                <div></div>
              </div>
              <div className="pl-32">$6.99</div>
              <div className="flex items-start justify-center w-40 max-w-full border rounded-lg py-3 ml-32 font-bold">
                <button className="px-8">-</button>
                <div>2</div>
                <button className="px-8">+</button>
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
                <span>SUBTOTAL</span>
                <span>$13.98</span>
              </div>
              <p className="text-sm pt-4 text-gray-700 font-medium">
                Taxes and shipping calculated at checkout
              </p>
              <Button className="w-full font-bold text-black mt-3">
                Checkout
              </Button>
              <Link href="/">
                <div className="flex pt-4">
                  <span className="translate-y-1 pr-2">
                    <BsArrowLeft />
                  </span>
                  <p>Continue shopping</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
