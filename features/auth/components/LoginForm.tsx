"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

import { useLogin, useProviderLogin } from "@/features/auth/hooks/useAuth";
import {
  LoginFormData,
  LoginFormSchema,
} from "@/features/auth/schemas/auth.schema";

import Inputs from "@/components/shared/inputs/inputs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {
  const { login, isLoading } = useLogin();
  const { loginWithProvider } = useProviderLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data);
  };

  return (
    <div className="pt-6">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Inputs
            id="email"
            disabled={isLoading}
            label="Email"
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
            required
            type="password"
          />
          <Button onClick={handleSubmit(onSubmit)} className="mt-4 w-full">
            {isLoading ? (
              <>
                <AiOutlineLoading className="mr-2 inline-block animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <div className="p-6 text-center text-xs font-semibold text-gray-600">
            OR CONTINUE WITH
          </div>
          <Button
            className="w-full border bg-transparent text-sm"
            onClick={() => loginWithProvider("google")}
          >
            <span className="pr-2">
              <Image
                src="/assets/GOOGLE-icon.png"
                width={20}
                height={20}
                alt="google icon"
              ></Image>
            </span>
            Google
          </Button>
          <Button
            className="mt-4 w-full gap-3 border bg-transparent px-7 font-semibold text-black"
            onClick={() => loginWithProvider("github")}
          >
            <span>
              <BsGithub size={20} />
            </span>
            Github
          </Button>
          <p className="pt-4 text-center text-sm font-semibold">
            Do not have an account?{" "}
            <Link href="/register" className="underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
