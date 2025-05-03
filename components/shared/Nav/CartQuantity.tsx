"use client";

import { useCartStore } from "@/stores/CartStore";
import { useEffect, useState } from "react";

export default function CartQuantity() {
  const [mounted, setMounted] = useState(false);
  const cartTotalQuantity = useCartStore((state) => state.getTotalQuantity());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
