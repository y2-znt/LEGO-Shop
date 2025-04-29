import AccesDenied from "@/components/ui/AccesDenied";
import { getCurrentUser } from "@/pages/api/auth/getCurrentUser";
import { getProducts } from "@/services/product.service";
import ManageProductsClient from "./ManageProductsClient";

export const revalidate = 0;

export default async function page() {
  const products = await getProducts();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccesDenied title="Oops! Acces denied" />;
  }
  return (
    <div>
      <ManageProductsClient products={products} />
    </div>
  );
}
