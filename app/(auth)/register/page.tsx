import { getCurrentUser } from "@/services/user.service";
import RegisterForm from "./RegisterForm";

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <RegisterForm currentUser={currentUser} />
    </div>
  );
}
