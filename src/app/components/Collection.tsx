"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoBag } from "react-icons/io5";
import { Data } from "./Data";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/redux/features/cartSlice";

export default function Collection() {
  const { products } = Data;
  const dispatch = useDispatch();

  const handleAddToCart = (lego: any) => {
    dispatch(addToCart(lego));
  };

  return (
    <main>
      <h1 className="text-3xl lg:text-4xl font-bold pt-24 max-sm:text-[1.7rem]">
        New collection
      </h1>
      <div className="pt-16">
        <div className="grid grid-cols-3 gap-20 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.map((lego, index) => {
            return (
              <Card className="rounded-lg" key={index}>
                <CardTitle className="text-xl p-8 font-bold">
                  {lego.title}
                </CardTitle>
                <CardHeader>
                  <figure className="flex justify-center h-40">
                    <Image
                      src={lego.image}
                      width={2000}
                      height={2000}
                      alt="Lego article"
                      className="w-1/3 rounded-xl "
                    />
                  </figure>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between py-12 font-bold">
                  ${lego.price}
                  <Button
                    onClick={() => handleAddToCart(lego)}
                    size="default"
                    className="rounded-xl text-md font-bold text-black max-md:text-sm active:bg-amber-200 transition-all"
                  >
                    Add to cart
                    <IoBag size={25} className="pl-2" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="glow -right-32 max-md:-right-40"></div>
    </main>
  );
}
