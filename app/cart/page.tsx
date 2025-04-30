import { getCurrentUser } from "@/services/user.service";
import Cart from "./Cart";

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <Cart currentUser={currentUser} />
    </div>
  );
}
