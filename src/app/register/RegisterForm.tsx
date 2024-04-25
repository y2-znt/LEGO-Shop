"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import Inputs from "../../components/ui/inputs";

export default function RegisterForm() {
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

  return (
    <div>
      <main className="max-w-6xl text-black mx-auto max-xl:px-8 font-bold">
        <h1 className="text-3xl lg:text-4xl pt-24 max-sm:text-[1.7rem] mb-12">
          Sign-up
        </h1>
        <div className="w-3/4 m-auto">
          <Button className="w-full bg-transparent px-7 gap-3 font-semibold border py-6">
            <span>
              <BsGoogle />
            </span>
            Sign Up with Google
          </Button>
          <Inputs
            id="name"
            label="Name"
            register={register}
            errors={errors}
            required
          />
          <Inputs
            id="email"
            label="Email"
            register={register}
            errors={errors}
            required
          />
          <Inputs
            id="password"
            label="Password"
            register={register}
            errors={errors}
            required
          />
          <Button className="font-bold w-full text-black active:bg-amber-200 transition-all py-6 mt-4">
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
