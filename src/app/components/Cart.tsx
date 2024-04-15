"use client";
import Header from "../components/Header";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { GoTrash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import {
  clearCart,
  decreaseCart,
  increaseCart,
  removeFromCart,
} from "@/lib/redux/features/cartSlice";

export default function Cart() {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem: any) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem: any) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleIncreaseCart = (cartItem: any) => {
    dispatch(increaseCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto max-xl:px-8 font-bold">
        <p className="text-3xl lg:text-4xl font-bold pt-24 max-sm:text-[1.7rem]">
          Shopping Cart
        </p>
        <div className="mx-8 space-y-10">
          <ul className="grid-cols-4 grid pt-12">
            <li>PRODUCT</li>
            <li className="pl-32">PRICE</li>
            <li className="pl-32">QUANTITY</li>
            <li className="flex justify-self-end">TOTAL</li>
          </ul>
          <div>
            {cart.cartItems?.map((cartItem: any, index: number) => (
              <div key={index} className="grid-cols-4 my-4 grid items-center">
                <div>
                  <Card className="rounded-xl">
                    <CardTitle className="text-xl pl-5 pt-5  font-bold">
                      <p>{cartItem.title}</p>
                    </CardTitle>
                    <CardHeader>
                      <figure className="flex justify-center h-32">
                        <Image
                          className="w-24"
                          src={cartItem.image}
                          alt=""
                          width={1000}
                          height={1000}
                        ></Image>
                      </figure>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end py-8 ">
                      <Button
                        onClick={() => handleRemoveFromCart(cartItem)}
                        className=" bg-transparent text-gray-700 hover:text-black"
                      >
                        Remove
                        <span className="pl-2">
                          <GoTrash color="red" />
                        </span>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <div className="pl-32">${cartItem.price}</div>
                <div className="flex items-start justify-center w-40 max-w-full border rounded-lg py-3 ml-32">
                  <button
                    onClick={() => handleDecreaseCart(cartItem)}
                    className="px-8"
                  >
                    -
                  </button>
                  <div>{cartItem.cartQuantity}</div>
                  <button
                    onClick={() => handleIncreaseCart(cartItem)}
                    className="px-8"
                  >
                    +
                  </button>
                </div>
                <div className="justify-self-end">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-start border-t pt-8 pl-2">
            <Button
              onClick={() => handleClearCart()}
              className="border px-8 py-5 text-gray-700 bg-transparent active:bg-amber-200 transition-all hover:text-black"
            >
              Clear Cart
            </Button>
            <div className="w-72 ">
              <div className="flex justify-between ">
                <span>SUBTOTAL</span>
                <span>${cart.cartTotalAmount}</span>
              </div>
              <p className="text-sm pt-4 text-gray-700 font-medium">
                Taxes and shipping calculated at checkout
              </p>
              <Button className="w-full  text-black mt-3 active:bg-amber-200 transition-all">
                Checkout
              </Button>
              <Link href="/">
                <div className="flex pt-4">
                  <span className="translate-y-1 pr-2">
                    <BsArrowLeft />
                  </span>
                  <p>Continue shopping</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
