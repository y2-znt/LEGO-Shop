import { useToastMutation } from "@/hooks/useToastMutation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};

export const useLogin = () => {
  const router = useRouter();

  const loginMutation = useToastMutation({
    mutationFn: (data: LoginFormData) => loginWithCredentials(data),
    loadingMessage: "Logging in, please wait...",
    successMessage: "Logged in successfully",
    errorMessage: "Error logging in",
    options: {
      onSuccess: () => {
        router.push("/");
        router.refresh();
      },
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
  };
};

export const useRegister = () => {
  const router = useRouter();

  const registerMutation = useToastMutation({
    mutationFn: async (data: RegisterFormData) => {
      return await registerUser(data);
    },
    loadingMessage: "Creating an account, please wait...",
    successMessage: "Account created successfully",
    errorMessage: "Error creating account",
    options: {
      onSuccess: () => {
        router.push("/");
        router.refresh();
      },
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
