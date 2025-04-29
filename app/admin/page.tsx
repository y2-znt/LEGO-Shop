import { getProducts } from "@/services/product.service";
import { getAllUsers } from "@/services/user.service";
import Summary from "./Summary";

export default async function page() {
  const allUsers = await getAllUsers();
  const products = await getProducts();

  return (
    <div>
      <Summary products={products} allUsers={allUsers} />
    </div>
  );
}
