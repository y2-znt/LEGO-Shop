"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addToCart } from "@/lib/redux/features/cartSlice";
import { removeFromFav } from "@/lib/redux/features/favSlice";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { IoIosHeart } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function Favorites() {
  const favorite = useSelector((state: any) => state.favorite);

  const dispatch = useDispatch();

  const handleAddToCart = (favItem: any) => {
    dispatch(addToCart(favItem));
  };

  const handleRemoveFav = (favItem: any) => {
    dispatch(removeFromFav(favItem));
  };

  return (
    <div>
      <main className="max-w-6xl mx-auto max-xl:px-8 font-bold">
        <p className="text-3xl lg:text-4xl pt-24 max-sm:text-[1.7rem]">
          Favorites
        </p>
        <div>
          {favorite.favItems.length === 0 ? (
            <div>
              <div className="flex flex-col m-12 items-center text-3xl font-bold text-gray-700 max-sm:text-[1.7rem]">
                <Image
                  src="/assets/favorite-empty.webp"
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-1/2 max-sm:w-full pb-12"
                ></Image>
                You have not favorites LEGO.
                <Link href="/">
                  <div className="flex pt-4">
                    <Button
                      size="lg"
                      className="text-base text-black font-bold"
                    >
                      <span className="pr-2">
                        <BsArrowLeft />
                      </span>
                      <p>Continue shopping</p>
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="pt-14 grid grid-cols-3 gap-20 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
              {favorite.favItems.map((favItem: any, index: number) => (
                <div key={index}>
                  <div>
                    <Card className="rounded-lg" key={index}>
                      <CardTitle className="flex justify-between text-xl p-8">
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
                        <Button
                          onClick={() => handleAddToCart(favItem)}
                          size="default"
                          className="rounded-xl text-md font-bold text-black max-md:text-sm active:bg-amber-200 transition-all"
                        >
                          Add to cart
                          <IoBag size={25} className="pl-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
