"use client";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { addToCart } from "@/lib/redux/features/cartSlice";
import { addToFav, removeFromFav } from "@/lib/redux/features/favSlice";
import Image from "next/image";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Data } from "./Data";

export default function Collection() {
  const { products } = Data;

  const favItems = useSelector((state: any) => state.favorite.favItems);
  const dispatch = useDispatch();

  const handleAddToCart = (lego: any) => {
    dispatch(addToCart(lego));
  };

  const toggleFavorite = (lego: any) => {
    const isAlreadyFavorite = favItems.some((item: any) => item.id === lego.id);
    if (isAlreadyFavorite) {
      dispatch(removeFromFav(lego));
    } else {
      dispatch(addToFav(lego));
    }
  };

  return (
    <main>
      <h1 className="text-3xl lg:text-4xl font-bold pt-24 max-sm:text-[1.7rem]">
        New collection
      </h1>
      <div className="pt-16">
        <div className="grid grid-cols-3 gap-20 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.map((lego, index) => {
            const isFavorite = favItems.some(
              (item: any) => item.id === lego.id
            );
            return (
              <Card className="rounded-lg" key={index}>
                <CardTitle className="flex justify-between text-xl p-8 font-bold">
                  {lego.title}
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleFavorite(lego)}
                  >
                    {isFavorite ? (
                      <IoIosHeart color="red" size={25} />
                    ) : (
                      <IoIosHeartEmpty color="gray" size={25} />
                    )}
                  </span>
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
                    className="rounded-xl text-md  max-md:text-sm "
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
