import AccesDenied from "@/components/ui/AccesDenied";
import { getCurrentUser } from "@/services/user.service";
import AddProductForm from "./AddProductForm";

export default async function AddProducts() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccesDenied title="Oops! Acces denied" />;
  }

  return (
    <div>
      <h1 className="text-3xl max-sm:text-[1.7rem] lg:text-4xl">
        Add Products
      </h1>
      <AddProductForm />
    </div>
  );
}
