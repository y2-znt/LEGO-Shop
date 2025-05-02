"use client";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/useAuth";
import { useCartActions } from "@/hooks/useCartActions";
import { createCheckoutSession } from "@/lib/api/checkoutApi";
import { CartItem, useCartStore } from "@/stores/CartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import { toast } from "sonner";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const { items, getTotalPrice } = useCartStore();
  const { remove, increase, decrease, clear } = useCartActions();

  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const handleCheckout = async () => {
    setIsLoading(true);

    if (!currentUser) {
      setIsLoading(false);
      router.push("/login");
      toast.error("Please login to checkout");
      return;
    }

    try {
      const { url } = await createCheckoutSession({
        email: currentUser.email,
        items: items,
      });
      window.location.href = url;
    } catch (error) {
      toast.error("An error occurred during checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Title text="Shopping Cart" />
      {items.length === 0 ? (
        <div>
          <div className="m-12 flex flex-col items-center text-3xl text-gray-700 max-sm:text-[1.7rem]">
            <Image
              src="/assets/cart-empty.jpg"
              alt=""
              width={1000}
              height={1000}
              className="w-1/2 max-sm:w-full"
            ></Image>
            Your cart is currently empty.
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
        <div className="mx-8 space-y-10">
          <ul className="grid grid-cols-4 pt-12 max-sm:hidden">
            <li>PRODUCT</li>
            <li className="pl-32 max-lg:pl-12">PRICE</li>
            <li className="pl-32 max-lg:pl-12">QUANTITY</li>
            <li className="flex justify-self-end">TOTAL</li>
          </ul>
          <div>
            {items.map((item: CartItem, index: number) => (
              <div
                key={index}
                className="my-4 grid grid-cols-4 items-center max-sm:grid-cols-1"
              >
                <div>
                  <Card className="rounded-xl">
                    <CardTitle className="pt-5 pl-5 text-xl font-bold">
                      <p>{item.name}</p>
                    </CardTitle>
                    <CardHeader>
                      <figure className="flex h-32 justify-center">
                        <Image
                          className="w-24"
                          src={item.image}
                          alt=""
                          width={1000}
                          height={1000}
                        ></Image>
                      </figure>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end py-8">
                      <Button
                        onClick={() => remove(item)}
                        className="bg-transparent text-gray-700 hover:text-black"
                      >
                        Remove
                        <span className="pl-2">
                          <GoTrash color="red" />
                        </span>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <div className="pl-32 max-lg:pl-12 max-sm:absolute max-sm:mt-14 max-sm:ml-6 max-sm:pl-0">
                  ${item.price.toFixed(2)}
                </div>
                <div className="ml-32 flex w-40 max-w-full items-start justify-center rounded-lg bg-[#FFD300] py-2 max-lg:ml-12 max-sm:m-6 max-sm:w-52">
                  <button onClick={() => decrease(item)} className="px-8">
                    <span className="rounded-full px-3 py-1 text-xl">-</span>
                  </button>
                  <div>{item.quantity}</div>
                  <button onClick={() => increase(item)} className="px-8">
                    <span className="rounded-full px-3 py-1 text-xl">+</span>
                  </button>
                </div>
                <div className="justify-self-end max-sm:p-12 max-sm:pt-0">
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start justify-between border-t pt-8 pl-2 max-sm:flex-col max-sm:items-center max-sm:justify-center">
            <Button
              onClick={() => clear()}
              className="border bg-transparent px-8 py-5 text-gray-700 hover:text-black max-sm:w-full max-sm:px-5 max-sm:py-2"
            >
              Clear Cart
            </Button>
            <div className="w-72 pt-12">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <p className="pt-4 text-sm font-medium text-gray-700">
                Taxes and shipping calculated at checkout
              </p>
              <Button
                onClick={handleCheckout}
                className="mt-3 w-full py-5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <AiOutlineLoading className="mr-2 inline-block animate-spin" />
                    Checking out...
                  </>
                ) : (
                  "Checkout"
                )}
              </Button>
              <Link href="/">
                <div className="mb-24 flex pt-4">
                  <span className="translate-y-1 pr-2">
                    <BsArrowLeft />
                  </span>
                  <p>Continue shopping</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
