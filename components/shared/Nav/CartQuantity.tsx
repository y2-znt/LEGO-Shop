"use client";

import { useCart } from "@/hooks/useCart";

interface CartQuantityProps {
  userId: string | undefined;
}

interface CartItem {
  quantity: number;
}

export default function CartQuantity({ userId }: CartQuantityProps) {
  const { cart } = useCart(userId || "");

  const cartTotalQuantity =
    cart?.items?.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0,
    ) || 0;

  return (
    <div>
      {cartTotalQuantity > 0 && (
        <span className="absolute top-4 right-5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
          {cartTotalQuantity}
        </span>
      )}
    </div>
  );
}
