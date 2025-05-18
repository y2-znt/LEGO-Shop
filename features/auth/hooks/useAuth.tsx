import {
  getCurrentUser,
  loginWithCredentials,
  loginWithProvider,
  registerUser,
} from "@/features/auth/lib/authApi";
import {
  LoginFormData,
  RegisterFormData,
} from "@/features/auth/schemas/auth.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};

export const useLogin = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await loginWithCredentials(data);
    },
    onMutate: () => {
      const toastId = toast.loading("Logging in, please wait...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Logged in successfully");
      router.push("/");
      router.refresh();
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      if (error.message.includes("Invalid email or password")) {
        toast.error("Incorrect email or password. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", error);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
  };
};

export const useRegister = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const registeredUser = await registerUser(data);
      return { user: registeredUser };
    },
    onMutate: () => {
      const toastId = toast.loading("Creating an account, please wait...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Account successfully created");
      router.push("/");
      router.refresh();
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Something went wrong");
      console.error("Registration error:", error);
    },
  });

  return {
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
  };
};

export const useProviderLogin = () => {
  const providerLoginMutation = useMutation({
    mutationFn: (provider: "google" | "github") => loginWithProvider(provider),
  });

  return {
    loginWithProvider: providerLoginMutation.mutate,
  };
};
