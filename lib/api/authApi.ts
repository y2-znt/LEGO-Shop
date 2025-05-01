import { LoginFormData, RegisterFormData } from "@/schemas/auth.schema";
import { signIn } from "next-auth/react";

export const registerUser = async (data: RegisterFormData) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error registering user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const loginWithCredentials = async (data: LoginFormData) => {
  const response = await signIn("credentials", {
    ...data,
    redirect: false,
  });

  if (!response?.ok) {
    throw new Error(response?.error || "Failed to login");
  }

  return response;
};

export const loginWithProvider = async (provider: "google" | "github") => {
  return signIn(provider);
};
