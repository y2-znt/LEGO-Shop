"use client";

import OutOfStock from "@/components/shared/OutOfStock";
import Title from "@/components/shared/Title";
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
      <Title text="New Collection" className="pt-16" />
      <div className="py-16">
        <div className="grid grid-cols-3 gap-20 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products &&
            products.map((product) => {
              const isFavorite = items.some((item) => item.id === product.id);
              return (
                <Card className="rounded-lg" key={product.id}>
                  {!product.inStock && <OutOfStock />}
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
                      <Button onClick={() => addToCart(product)}>
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
