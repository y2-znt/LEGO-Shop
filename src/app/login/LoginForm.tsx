"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";
import Inputs from "../../components/ui/inputs";
import { SafeUser } from "../types";

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
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push("/");
        router.refresh();
        toast.success("Logged In");
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
        <h1 className="text-3xl lg:text-4xl pt-24 max-sm:text-[1.7rem] mb-12">
          Log-in
        </h1>
        <div className="w-3/4 max-sm:w-full m-auto">
          <Button
            className="w-full font-semibold bg-transparent px-7 gap-3 border py-6"
            onClick={() => signIn("google")}
          >
            <span>
              <BsGoogle />
            </span>
            Continue with Google
          </Button>
          <Inputs
            id="email"
            disabled={isLoading}
            label="Email"
            register={register}
            errors={errors}
            required
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
          <Button
            onClick={handleSubmit(onSubmit)}
            className="font-bold w-full text-black active:bg-amber-200 transition-all py-6 mt-4"
          >
            Login
          </Button>
          <p className="text-sm font-semibold text-center pt-4">
            Do not have an account?{" "}
            <Link href="/register" className="underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
