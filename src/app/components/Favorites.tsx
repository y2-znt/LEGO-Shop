"use client";

import React from "react";
import Header from "./Header";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { IoIosHeart } from "react-icons/io";
import { removeFromFav } from "@/lib/redux/features/favSlice";

export default function Favorites() {
  const favorite = useSelector((state: any) => state.favorite);

  const dispatch = useDispatch();

  const handleRemoveFav = (favItem: any) => {
    dispatch(removeFromFav(favItem));
  };

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto max-xl:px-8">
        <p className="text-3xl lg:text-4xl font-bold pt-24 max-sm:text-[1.7rem]">
          Favorites
        </p>
        <div className="pt-14 grid grid-cols-3 gap-20 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          <div>
            {favorite.favItems.map((favItem: any, index: number) => (
              <div key={index}>
                <div>
                  <Card className="rounded-lg" key={index}>
                    <CardTitle className="flex justify-between text-xl p-8 font-bold">
                      {favItem.title}
                      <span
                        className="cursor-pointer"
                        onClick={() => handleRemoveFav(favItem)}
                      >
                        <IoIosHeart color="red" size={25} />
                      </span>
                    </CardTitle>
                    <CardHeader>
                      <figure className="flex justify-center h-40">
                        <Image
                          src={favItem.image}
                          width={2000}
                          height={2000}
                          alt="Lego article"
                          className="w-1/3 rounded-xl "
                        />
                      </figure>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between py-12 font-bold">
                      ${favItem.price}
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
