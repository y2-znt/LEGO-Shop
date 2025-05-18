"use client";
import PageState from "@/components/shared/PageState";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import CartItemCard from "@/features/cart/components/CartItemCard";
import { useCartActions } from "@/features/cart/hooks/useCartActions";
import { createCheckoutSession } from "@/lib/api/checkoutApi";
import { CartItem, useCartStore } from "@/stores/CartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "sonner";

export default function CartView() {
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
        <PageState
          title="Your cart is currently empty."
          imagePath="/assets/cart-empty.jpg"
          buttonText="Continue shopping"
          showButton={true}
        />
      ) : (
        <div className="mx-8 space-y-10">
          <ul className="grid grid-cols-4 pt-12 max-sm:hidden">
            <li>PRODUCT</li>
            <li className="pl-32 max-lg:pl-12">PRICE</li>
            <li className="pl-32 max-lg:pl-12">QUANTITY</li>
            <li className="flex justify-self-end">TOTAL</li>
          </ul>
          <div>
            {items.map((item: CartItem) => (
              <CartItemCard
                key={item.id}
                item={item}
                onRemove={remove}
                onIncrease={increase}
                onDecrease={decrease}
              />
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
