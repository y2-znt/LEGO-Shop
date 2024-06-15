"use client";
import { Product } from "@prisma/client";

type SummaryType = {
  products: Product[];
};

export default function Summary({ products }: SummaryType) {
  const inStockCount = products.filter((product) => product.inStock).length;
  const outOfStockCount = products.length - inStockCount;

  return (
    <div>
      <h1 className="text-4xl max-md:text-3xl pt-10 max-sm:text-[1.7rem]">
        Summary
      </h1>
      <div className="mt-10 grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl">Total Products</h2>
          <p>{products.length}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl">In Stock</h2>
          <p>{inStockCount}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl">Out of Stock</h2>
          <p>{outOfStockCount}</p>
        </div>
      </div>
    </div>
  );
}
