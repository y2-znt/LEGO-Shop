import AccesDenied from "@/components/ui/AccesDenied";
import { getCurrentUser } from "@/pages/api/auth/getCurrentUser";

export default async function AddProducts() {
  const currentUser = await getCurrentUser();

  // Check if the current user is not authenticated or is not an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccesDenied title="Oops! Acces denied" />;
  }

  return (
    <div className="max-w-6xl mx-auto max-xl:px-8 font-bold text-black">
      <p className="text-3xl lg:text-4xl pt-10 max-sm:text-[1.7rem]">
        Add Products
      </p>
    </div>
  );
}
