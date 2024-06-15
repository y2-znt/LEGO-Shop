"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { Product } from "@prisma/client";
import Image from "next/image";

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
      <div className="mt-20">
        <h2 className="text-2xl">Recently Added Products</h2>
        <div className="overflow-auto ">
          <Table className="mt-10">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.slice(0, 5).map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-16 rounded-lg border p-1 object-cover"
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>$ {product.price}</TableCell>
                  <TableCell>
                    {new Date(product.updatedAt).toLocaleDateString()} -
                    {new Date(product.updatedAt).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
