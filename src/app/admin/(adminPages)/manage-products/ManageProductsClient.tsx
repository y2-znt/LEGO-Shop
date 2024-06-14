"use client";

import { useState } from "react";
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
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdCached, MdDelete, MdCheck, MdEdit } from "react-icons/md";
import { toast } from "sonner";
import firebaseApp from "../../../../../prisma/firebase";

type ManageProductsClientType = {
  products: Product[];
};

export default function ManageProductsClient({
  products,
}: ManageProductsClientType) {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ name: "", price: "" });

  const handleToggleStock = async (id: string, inStock: boolean) => {
    try {
      await axios.put("/api/product", {
        id,
        inStock: !inStock,
      });

      toast.success("LEGO stock status updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

  const handleDeleteProduct = async (id: string, image: string) => {
    toast("Deleting LEGO, please wait...");

    const handleDeleteImage = async () => {
      try {
        const imageRef = ref(storage, image);
        await deleteObject(imageRef);
        console.log("Image deleted successfully", image);
      } catch (error) {
        console.log("Deleting image error", error);
      }
    };
    await handleDeleteImage();

    axios
      .delete(`/api/product?id=${id}`)
      .then((res) => {
        toast.success("LEGO deleted successfully");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Error deleting LEGO");
        console.log("Error deleting product", error);
      });
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setEditValues({ name: product.name, price: product.price.toString() });
  };

  const handleSaveClick = async (id: string) => {
    try {
      await axios.put(`/api/product/${id}`, {
        id,
        name: editValues.name,
        price: parseFloat(editValues.price),
      });

      toast.success("Product updated successfully!");
      setEditingId(null);
      router.refresh();
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

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
              <TableCell>
                {editingId === product.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editValues.name}
                    onChange={handleChange}
                    className="border p-1"
                  />
                ) : (
                  product.name
                )}
              </TableCell>
              <TableCell>
                {editingId === product.id ? (
                  <input
                    type="text"
                    name="price"
                    value={editValues.price}
                    onChange={handleChange}
                    className="border p-1"
                  />
                ) : (
                  `$${product.price}`
                )}
              </TableCell>
              <TableCell>
                {product.inStock ? (
                  <Status text="Yes" color="bg-green-500" />
                ) : (
                  <Status text="No" color="bg-red-500" />
                )}
              </TableCell>
              <TableCell>
                <TableCell className="flex gap-4">
                  {editingId === product.id ? (
                    <ActionBtn
                      icon={MdCheck}
                      onClick={() => handleSaveClick(product.id)}
                    />
                  ) : (
                    <ActionBtn
                      icon={MdEdit}
                      onClick={() => handleEditClick(product)}
                    />
                  )}
                  <ActionBtn
                    icon={MdCached}
                    onClick={() =>
                      handleToggleStock(product.id, product.inStock)
                    }
                  />
                  <ActionBtn
                    icon={MdDelete}
                    onClick={() => {
                      handleDeleteProduct(product.id, product.image);
                    }}
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
