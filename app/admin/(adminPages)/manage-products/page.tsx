import { getProducts } from "@/services/product.service";
import ManageProductsClient from "./ManageProductsClient";

export const revalidate = 0;

export default async function page() {
  const products = await getProducts();

  return (
    <div>
      <ManageProductsClient products={products} />
    </div>
  );
}
