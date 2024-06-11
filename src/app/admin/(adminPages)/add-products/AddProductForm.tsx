"use client";
import CustomCheckBox from "@/components/ui/inputs/CustomCheckBox";
import Inputs from "@/components/ui/inputs/inputs";
import SelectImage from "@/components/ui/inputs/SelectImage";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";

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

  const handleFileChange = (file: File) => {
    setValue("image", file);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product data", data);
  };

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
            <SelectImage
              item={watch("image")}
              handleFileChange={handleFileChange}
            />
            <Button className="w-full my-4" onClick={handleSubmit(onSubmit)}>
              {isLoading ? (
                <>
                  <AiOutlineLoading className="animate-spin inline-block mr-2" />
                  Adding LEGO...
                </>
              ) : (
                "Add LEGO"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
