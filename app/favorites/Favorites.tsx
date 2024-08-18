"use client";

import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { IoIosHeart } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/shadcn/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/shadcn/card";
import { addToCart } from "../redux/features/cartSlice";
import { removeFromFav } from "../redux/features/favSlice";

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
      <p className="text-3xl max-sm:text-[1.7rem] lg:text-4xl">Favorites</p>
      <div>
        {favorite.favItems.length === 0 ? (
          <div>
            <div className="m-12 flex flex-col items-center text-3xl font-bold text-gray-700 max-sm:text-[1.7rem]">
              <Image
                src="/assets/favorite-empty.webp"
                alt=""
                width={1000}
                height={1000}
                className="w-1/2 pb-12 max-sm:w-full"
              ></Image>
              You have not favorites LEGO.
              <Link href="/">
                <div className="flex pt-4">
                  <Button size="lg" className="text-base">
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
          <div className="grid grid-cols-3 gap-20 pt-14 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            {favorite.favItems.map((favItem: any, index: number) => (
              <div key={index}>
                <div>
                  <Card className="rounded-lg" key={index}>
                    {!favItem.inStock && (
                      <div className="flex items-center justify-end">
                        <div className="absolute -mr-4 mt-6 rotate-[20deg] rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white">
                          Out of stock
                        </div>
                      </div>
                    )}
                    <CardTitle className="flex justify-between p-8 text-xl font-bold">
                      {favItem.name}
                      <span
                        className="cursor-pointer"
                        onClick={() => handleRemoveFav(favItem)}
                      >
                        <IoIosHeart color="red" size={25} />
                      </span>
                    </CardTitle>
                    <CardHeader>
                      <figure className="flex h-40 justify-center">
                        <Image
                          src={favItem.image}
                          width={2000}
                          height={2000}
                          alt="Lego article"
                          className="w-1/3 rounded-xl"
                        />
                      </figure>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between py-12 font-bold">
                      ${favItem.price}
                      {favItem.inStock && (
                        <Button
                          onClick={() => handleAddToCart(favItem)}
                          size="default"
                          className="text-md rounded-xl max-md:text-sm"
                        >
                          Add to cart
                          <IoBag size={25} className="pl-2" />
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
