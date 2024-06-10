"use client";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { toast } from "sonner";
import Inputs from "../../../components/ui/inputs/inputs";
import { SafeUser } from "../../types";

type LoginFormType = {
  currentUser: SafeUser | null;
};

export default function LoginForm({ currentUser }: LoginFormType) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  // Login function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const promise = (): Promise<void> =>
      new Promise((resolve) => setTimeout(() => resolve(), 2000));
    setIsLoading(true);
    toast.promise(promise(), {
      loading: "Loading...",
      error: "Error",
    });

    // SignIn
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged In Successfully");
        router.push("/");
        router.refresh();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  // Redirection to home page when user is logged
  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  return (
    <div>
      <main className="max-w-6xl text-black mx-auto max-xl:px-8 font-bold">
        <div className="pt-24"></div>
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
            <Button onClick={handleSubmit(onSubmit)} className="w-full mt-4 ">
              Login
              {isLoading && <AiOutlineLoading className="animate-spin ml-2" />}
            </Button>
            <div className="text-center text-gray-600 p-6 font-semibold text-xs">
              OR CONTINUE WITH
            </div>
            <Button
              className="w-full text-sm bg-transparent border"
              onClick={() => signIn("google")}
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
              className="w-full text-black bg-transparent px-7 mt-4 gap-3 font-semibold border"
              onClick={() => signIn("github")}
            >
              <span>
                <BsGithub size={20} />
              </span>
              Github
            </Button>
            <p className="text-sm font-semibold text-center pt-4">
              Do not have an account?{" "}
              <Link href="/register" className="underline">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
