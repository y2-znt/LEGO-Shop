"use client";

import Title from "@/components/shared/Title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionBtn from "@/features/admin/components/ActionBtn";
import Status from "@/features/admin/components/Status";
import {
  useDeleteProduct,
  useDeleteProductImage,
  useProduct,
  useToggleStock,
  useUpdateProduct,
} from "@/features/admin/hooks/useProduct";
import Image from "next/image";
import { useState } from "react";
import { MdCached, MdCheck, MdDelete, MdEdit } from "react-icons/md";

export default function ManageProductsView() {
  const [editingId, setEditingId] = useState("");
  const [editValues, setEditValues] = useState({ name: "", price: "" });
  const { data: products } = useProduct();
  const { deleteProduct } = useDeleteProduct();
  const { updateProduct } = useUpdateProduct();
  const { toggleStock } = useToggleStock();
  const { deleteProductImage } = useDeleteProductImage();

  const handleToggleStock = (id: string, inStock: boolean) => {
    toggleStock({ id, inStock });
  };

  const handleDeleteProduct = (id: string, image: string) => {
    deleteProductImage(image);
    deleteProduct(id);
  };

  const handleEditClick = (id: string, name: string, price: number) => {
    setEditingId(id);
    setEditValues({ name: name, price: price.toString() });
  };

  const handleSaveClick = (id: string) => {
    updateProduct({
      id,
      data: {
        name: editValues.name,
        price: parseFloat(editValues.price),
      },
    });
    setEditingId("");
    setEditValues({ name: "", price: "" });
  };

  return (
    <div>
      <Title text="Manage Products" />
      <Table className="mt-10">
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Update At</TableHead>
            <TableHead>In Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products &&
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-12 rounded-lg border object-cover p-1"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editValues.name}
                      className="border p-1"
                      onChange={(e) =>
                        setEditValues({ ...editValues, name: e.target.value })
                      }
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === product.id ? (
                    <input
                      type="number"
                      name="price"
                      value={editValues.price}
                      className="border p-1"
                      onChange={(e) =>
                        setEditValues({ ...editValues, price: e.target.value })
                      }
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </TableCell>
                <TableCell>
                  {new Date(product.updatedAt).toLocaleDateString()} -
                  {new Date(product.updatedAt).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {product.inStock ? (
                    <Status text="Yes" color="bg-green-500" width="w-16" />
                  ) : (
                    <Status text="No" color="bg-red-500" width="w-16" />
                  )}
                </TableCell>
                <TableCell className="flex gap-4 pt-5">
                  <ActionBtn
                    icon={MdCached}
                    onClick={() =>
                      handleToggleStock(product.id, product.inStock)
                    }
                  />
                  {editingId === product.id ? (
                    <ActionBtn
                      icon={MdCheck}
                      onClick={() => handleSaveClick(product.id)}
                    />
                  ) : (
                    <ActionBtn
                      icon={MdEdit}
                      onClick={() =>
                        handleEditClick(product.id, product.name, product.price)
                      }
                    />
                  )}
                  <ActionBtn
                    icon={MdDelete}
                    onClick={() => {
                      handleDeleteProduct(product.id, product.image);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
