import AccesDenied from "../../components/ui/AccesDenied";
import getAllUsers from "../../pages/api/auth/getAllUsers";
import { getCurrentUser } from "../../pages/api/auth/getCurrentUser";
import getProducts from "../../pages/api/auth/getProducts";
import Summary from "./Summary";

export default async function page() {
  const currentUser = await getCurrentUser();
  const allUsers = await getAllUsers();
  const products = await getProducts();

  // Check if the current user is not authenticated or is not an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccesDenied title="Oops! Acces denied" />;
  }
  return (
    <div>
      <Summary products={products} allUsers={allUsers} />
    </div>
  );
}
