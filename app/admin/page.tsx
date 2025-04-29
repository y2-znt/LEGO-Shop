import AccesDenied from "@/components/ui/AccesDenied";
import { getProducts } from "@/services/product.service";
import { getAllUsers, getCurrentUser } from "@/services/user.service";
import Summary from "./Summary";

export default async function page() {
  const currentUser = await getCurrentUser();
  const allUsers = await getAllUsers();
  const products = await getProducts();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccesDenied title="Oops! Acces denied" />;
  }
  return (
    <div>
      <Summary products={products} allUsers={allUsers} />
    </div>
  );
}
