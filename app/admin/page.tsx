import { getProducts } from "@/services/product.service";
import Summary from "./Summary";

export default async function page() {
  const products = await getProducts();

  return (
    <div>
      <Summary products={products} />
    </div>
  );
}
