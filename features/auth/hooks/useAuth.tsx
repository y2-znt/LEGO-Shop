import { useToastMutation } from "@/hooks/useToastMutation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  getCurrentUser,
  loginWithCredentials,
  loginWithProvider,
  registerUser,
} from "@/features/auth/lib/authApi";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useToastMutation({
    mutationFn: loginWithCredentials,
    loadingMessage: "Logging in, please wait...",
    successMessage: "Logged in successfully",
    errorMessage: "Error logging in",
    options: {
      onSuccess: () => {
        router.push("/");
        router.refresh();
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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
  const queryClient = useQueryClient();
  const registerMutation = useToastMutation({
    mutationFn: registerUser,
    loadingMessage: "Creating an account, please wait...",
    successMessage: "Account created successfully",
    errorMessage: "Error creating account",
    options: {
      onSuccess: () => {
        router.push("/");
        router.refresh();
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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
    mutationFn: loginWithProvider,
  });

  return {
    loginWithProvider: providerLoginMutation.mutate,
  };
};
