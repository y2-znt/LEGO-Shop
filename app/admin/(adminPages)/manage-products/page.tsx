import { getProducts } from "@/services/product.service";
import ManageProductsClient from "./ManageProductsClient";

export const revalidate = 0;

export default async function page() {
  return (
    <div>
      <ManageProductsClient />
    </div>
  );
}
