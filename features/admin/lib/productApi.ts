import { CreateProductData, UpdateProductData } from "@/types";
import { Product } from "@prisma/client";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import firebaseApp from "@/lib/firebase";

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
  productData: UpdateProductData
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

export const createProduct = async (data: CreateProductData) => {
  try {
    const imageUrl = await uploadProductImage(data.image);

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        image: imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Error creating product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const uploadProductImage = async (image: File) => {
  try {
    const filename = new Date().getTime() + "-" + image.name;
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `product/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    const downloadURL = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading image:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => resolve(downloadURL))
            .catch((error) => reject(error));
        }
      );
    });

    return downloadURL;
  } catch (error) {
    console.error("Error handling image upload", error);
    throw error;
  }
};
