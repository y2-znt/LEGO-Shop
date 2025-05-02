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
import { useCartActions } from "@/hooks/useCartActions";
import { useFavoriteActions } from "@/hooks/useFavoriteActions";
import { FavoriteItem, useFavoriteStore } from "@/stores/FavoriteStore";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { IoIosHeart } from "react-icons/io";
import { IoBag } from "react-icons/io5";

export default function Favorites() {
  const { items } = useFavoriteStore();
  const { remove: removeFavorite } = useFavoriteActions();
  const { addFromFavorite: addToCart } = useCartActions();

  return (
    <div>
      <Title text="Favorites" />
      <div>
        {items.length === 0 ? (
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
                  <Button size="lg">
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
            {items.map((favItem: FavoriteItem, index: number) => (
              <div key={index}>
                <div>
                  <Card className="rounded-lg" key={index}>
                    {!favItem.inStock && <OutOfStock />}
                    <CardTitle className="flex justify-between p-8 text-xl font-bold">
                      {favItem.name}
                      <span
                        className="cursor-pointer"
                        onClick={() => removeFavorite(favItem)}
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
                        <Button onClick={() => addToCart(favItem)}>
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
