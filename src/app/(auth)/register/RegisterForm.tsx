"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { toast } from "sonner";
import Inputs from "../../../components/ui/inputs";
import { SafeUser } from "../../types";

type LoginFormType = {
  currentUser: SafeUser | null;
};

export default function RegisterForm({ currentUser }: LoginFormType) {
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

  // Register function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    console.log("form data: ", data);

    axios
      .post("/api/register", data)
      .then(() => {
        const promise = (): Promise<void> =>
          new Promise((resolve) => setTimeout(() => resolve(), 2000));

        toast.promise(promise(), {
          loading: "Loading...",
          error: "Error",
        });

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            toast.success("Account successfully created");
            router.push("/");
            router.refresh();
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
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
        <div className="w-3/4 max-sm:w-full m-auto"></div>
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
              required
              type="password"
            />
            <Button className="w-full mt-4" onClick={handleSubmit(onSubmit)}>
              Sign Up
            </Button>
            <div className="text-center text-gray-600 p-6  text-xs">
              OR CONTINUE WITH
            </div>
            <Button
              className="w-full bg-transparent px-7 gap-3 border"
              onClick={() => signIn("google")}
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
              className="w-full bg-transparent px-7 mt-4 gap-3 border"
              onClick={() => signIn("github")}
            >
              <span>
                <BsGithub size={20} />
              </span>
              Github
            </Button>
            <p className="text-sm font-semibold text-center pt-4">
              Already a account?{" "}
              <Link href="/login" className="underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
