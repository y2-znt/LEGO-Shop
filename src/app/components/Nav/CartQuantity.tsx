"use client";

import { useSelector } from "react-redux";

export default function CartQuantity() {
  const { cartTotalQuantity } = useSelector((state: any) => state.cart);

  return (
    <div>
      {cartTotalQuantity > 0 && (
        <span className="absolute top-4 right-5 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cartTotalQuantity}
        </span>
      )}
    </div>
  );
}
