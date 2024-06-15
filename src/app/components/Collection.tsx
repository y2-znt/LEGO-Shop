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
import { Product } from "@prisma/client";
import Image from "next/image";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

type CollectionType = {
  products: Product[];
};

export default function Collection({ products }: CollectionType) {
  const favItems = useSelector((state: any) => state.favorite.favItems);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const toggleFavorite = (product: Product) => {
    const isAlreadyFavorite = favItems.some(
      (item: any) => item.id === product.id
    );
    if (isAlreadyFavorite) {
      dispatch(removeFromFav(product));
    } else {
      dispatch(addToFav(product));
    }
  };

  return (
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold pt-24 max-sm:text-[1.7rem]">
        New Collection
      </h1>
      <div className="pt-16">
        <div className="grid grid-cols-3 gap-20 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products &&
            products.map((product) => {
              const isFavorite = favItems.some(
                (item: any) => item.id === product.id
              );
              return (
                <Card className="rounded-lg" key={product.id}>
                  {!product.inStock && (
                    <div className="flex justify-end items-center">
                      <div className="bg-red-500 text-white text-sm absolute rounded-lg py-2 px-4 mt-8 -mr-4 font-semibold rotate-[20deg] ">
                        Out of stock
                      </div>
                    </div>
                  )}
                  <CardHeader className="flex flex-row justify-between p-8">
                    <CardTitle className="text-xl font-bold">
                      {product.name}
                    </CardTitle>
                    <span
                      className="cursor-pointer"
                      onClick={() => toggleFavorite(product)}
                    >
                      {isFavorite ? (
                        <IoIosHeart color="red" size={25} />
                      ) : (
                        <IoIosHeartEmpty color="gray" size={25} />
                      )}
                    </span>
                  </CardHeader>
                  <figure className="flex justify-center h-40">
                    <Image
                      src={product.image}
                      width={2000}
                      height={2000}
                      alt={product.name}
                      className="w-1/3 rounded-xl"
                    />
                  </figure>
                  <CardDescription></CardDescription>
                  <CardFooter className="flex justify-between py-12 font-bold">
                    ${product.price}
                    {product.inStock && (
                      <Button
                        onClick={() => handleAddToCart(product)}
                        size="default"
                        className="rounded-xl text-md max-md:text-sm"
                      >
                        Add to cart
                        <IoBag size={25} className="pl-2" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
      <div className="glow -right-32 max-md:-right-40"></div>
    </div>
  );
}
