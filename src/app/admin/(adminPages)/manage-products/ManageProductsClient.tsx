"use client";

import ActionBtn from "@/components/ui/ActionBtn";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import Status from "@/components/ui/Status";
import { Product } from "@prisma/client";
import Image from "next/image";
import { MdCached, MdDelete } from "react-icons/md";
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
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
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
              <TableCell>${product.price}</TableCell>
              <TableCell>
                {product.inStock ? (
                  <Status text="Yes" color="bg-green-500" />
                ) : (
                  <Status text="No" color="bg-red-500" />
                )}
              </TableCell>
              <TableCell>
                <TableCell className="flex gap-4">
                  <ActionBtn
                    icon={MdCached}
                    onClick={() => {}}
                    disabled={true}
                  />
                  <ActionBtn
                    icon={MdDelete}
                    onClick={() => {}}
                    disabled={true}
                  />
                </TableCell>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
