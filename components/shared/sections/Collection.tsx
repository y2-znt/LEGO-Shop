"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartActions } from "@/hooks/useCartActions"; // Updated import
import { useFavoriteActions } from "@/hooks/useFavoriteActions";
import { useProduct } from "@/hooks/useProduct";
import { useFavoriteStore } from "@/stores/FavoriteStore";
import Image from "next/image";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoBag } from "react-icons/io5";

export default function Collection() {
  const { data: products } = useProduct();

  const { add: addFavorite, remove: removeFavorite } = useFavoriteActions();
  const { add: addToCart } = useCartActions();
  const { items } = useFavoriteStore();

  return (
    <div>
      <h1 className="pt-24 text-3xl font-bold max-sm:text-[1.7rem] lg:text-4xl">
        New Collection
      </h1>
      <div className="pt-16">
        <div className="grid grid-cols-3 gap-20 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products &&
            products.map((product) => {
              const isFavorite = items.some((item) => item.id === product.id);
              return (
                <Card className="rounded-lg" key={product.id}>
                  {!product.inStock && (
                    <div className="flex items-center justify-end">
                      <div className="absolute mt-8 -mr-4 rotate-[20deg] rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white">
                        Out of stock
                      </div>
                    </div>
                  )}
                  <CardHeader className="flex flex-row justify-between p-8">
                    <CardTitle className="text-xl font-bold">
                      {product.name.toUpperCase()}
                    </CardTitle>
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        isFavorite
                          ? removeFavorite(product)
                          : addFavorite(product)
                      }
                    >
                      {isFavorite ? (
                        <IoIosHeart color="red" size={25} />
                      ) : (
                        <IoIosHeartEmpty color="gray" size={25} />
                      )}
                    </span>
                  </CardHeader>
                  <figure className="flex h-40 justify-center">
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
                        onClick={() => addToCart(product)}
                        size="default"
                        className="text-md rounded-xl max-md:text-sm"
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
