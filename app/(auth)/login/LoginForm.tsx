"use client";
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
import { Button } from "../../../components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/shadcn/card";
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
    setIsLoading(true);
    toast("Login to account, please wait...");
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
        toast.error("Error login");
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
      <main className="mx-auto max-w-6xl font-bold text-black max-xl:px-8">
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
            <Button onClick={handleSubmit(onSubmit)} className="mt-4 w-full">
              {isLoading ? (
                <>
                  <AiOutlineLoading className="mr-2 inline-block animate-spin" />
                  Logged in...
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
              className="mt-4 w-full gap-3 border bg-transparent px-7 font-semibold text-black"
              onClick={() => signIn("github")}
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
      </main>
    </div>
  );
}
