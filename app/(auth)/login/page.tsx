import { getCurrentUser } from "@/services/user.service";
import LoginForm from "./LoginForm";

export default async function Login() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <LoginForm currentUser={currentUser} />
    </div>
  );
}
