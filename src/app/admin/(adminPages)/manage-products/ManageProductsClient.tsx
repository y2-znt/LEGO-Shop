"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { Product } from "@prisma/client";
import Image from "next/image";

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
      <Table className="mt-10">
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                {product.inStock ? "in stock" : "out of stock"}
              </TableCell>
              <TableCell>
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover"
                  width={50}
                  height={50}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
