"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
        toast.success("Account successfully created");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/");
            router.refresh();
            toast.success("Logged In");
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
        <h1 className="text-3xl lg:text-4xl pt-24 max-sm:text-[1.7rem] mb-12">
          Sign-up
        </h1>
        <div className="w-3/4 max-sm:w-full m-auto">
          <Button
            className="w-full bg-transparent px-7 gap-3 font-semibold border py-6"
            onClick={() => signIn("google")}
          >
            <span>
              <BsGoogle />
            </span>
            Sign Up with Google
          </Button>
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
            className="font-bold w-full text-black active:bg-amber-200 transition-all py-6 mt-4"
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </Button>
          <p className="text-sm font-semibold text-center pt-4">
            Already a account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
