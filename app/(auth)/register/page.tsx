import { getCurrentUser } from "@/pages/api/auth/getCurrentUser";
import RegisterForm from "./RegisterForm";

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <RegisterForm currentUser={currentUser} />
    </div>
  );
}
