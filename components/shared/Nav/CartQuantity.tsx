"use client";

import { useSelector } from "react-redux";

export default function CartQuantity() {
  const { cartTotalQuantity } = useSelector((state: any) => state.cart);

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
