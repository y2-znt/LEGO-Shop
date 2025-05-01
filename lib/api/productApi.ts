import firebaseApp from "@/lib/firebase";
import { Product } from "@prisma/client";
import { deleteObject, getStorage, ref } from "firebase/storage";

interface UpdateProductData {
  name?: string;
  price?: number;
  inStock?: boolean;
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products", error);
    throw new Error("An error occurred while fetching products");
  }
};

export const updateProduct = async (
  id: string,
  productData: UpdateProductData,
) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};

export const toggleStock = async (id: string, inStock: boolean) => {
  return updateProduct(id, { inStock: !inStock });
};

export const deleteProductImage = async (imageUrl: string) => {
  try {
    const storage = getStorage(firebaseApp);
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error("Error deleting image from Firebase Storage:", error);
    throw error;
  }
};
