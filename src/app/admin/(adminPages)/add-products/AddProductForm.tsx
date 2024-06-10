"use client";
import CustomCheckBox from "@/components/ui/inputs/CustomCheckBox";
import Inputs from "@/components/ui/inputs/inputs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      inStock: false,
      image: "",
    },
  });

  return (
    <div>
      <div>
        <div className="pt-20"></div>
        <div className="w-full max-sm:w-full m-auto"></div>
        <Card className="mx-auto max-w-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Add a LEGO</CardTitle>
            <CardDescription>
              Enter the name, price and image to add the LEGO
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
              id="price"
              label="Price"
              disabled={isLoading}
              register={register}
              errors={errors}
              type="number"
              required
            />
            <CustomCheckBox
              id="inStock"
              register={register}
              label="This LEGO is in stock"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
