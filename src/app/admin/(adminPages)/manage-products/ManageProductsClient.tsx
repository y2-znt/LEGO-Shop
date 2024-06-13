"use client";

import { Product } from "@prisma/client";

type ManageProductsClientType = {
  products: Product[];
};
export default function ManageProductsClient({
  products,
}: ManageProductsClientType) {
  return (
    <div>
      <h1 className="text-3xl lg:text-4xl pt-10 max-sm:text-[1.7rem]">
        Manage Products
      </h1>
    </div>
  );
}
