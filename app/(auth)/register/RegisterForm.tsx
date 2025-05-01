"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

import Inputs from "@/components/shared/inputs/inputs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProviderLogin, useRegister } from "@/hooks/useAuth";
import { RegisterFormData, RegisterFormSchema } from "@/schemas/auth.schema";
import { SafeUser } from "@/types";

type RegisterFormType = {
  currentUser: SafeUser | null;
};

export default function RegisterForm({ currentUser }: RegisterFormType) {
  const router = useRouter();
  const { register: registerUser, isLoading } = useRegister();
  const { loginWithProvider } = useProviderLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    registerUser(data);
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  return (
    <div className="pt-6">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your name, email and password to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Inputs
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Inputs
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="email"
          />
          <Inputs
            id="password"
            disabled={isLoading}
            label="Password"
            register={register}
            errors={errors}
            type="password"
          />
          <Button className="mt-4 w-full" onClick={handleSubmit(onSubmit)}>
            {isLoading ? (
              <>
                <AiOutlineLoading className="mr-2 inline-block animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <div className="p-6 text-center text-xs text-gray-600">
            OR CONTINUE WITH
          </div>
          <Button
            className="w-full gap-3 border bg-transparent px-7"
            onClick={() => loginWithProvider("google")}
          >
            <span>
              <Image
                src="/assets/GOOGLE-icon.png"
                width={20}
                height={20}
                alt="google icon"
              ></Image>{" "}
            </span>
            Google
          </Button>
          <Button
            className="mt-4 w-full gap-3 border bg-transparent px-7"
            onClick={() => loginWithProvider("github")}
          >
            <span>
              <BsGithub size={20} />
            </span>
            Github
          </Button>
          <p className="pt-4 text-center text-sm font-semibold">
            Already a account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
