"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "sonner";

import { useCreateProduct } from "@/features/admin/hooks/useProduct";
import {
  AddProductFormData,
  AddProductFormSchema,
} from "@/features/admin/validations/form/product.form.schema";

import CustomCheckBox from "@/components/shared/inputs/CustomCheckBox";
import SelectImage from "@/components/shared/inputs/SelectImage";
import Inputs from "@/components/shared/inputs/inputs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateProductView() {
  const [resetFlag, setResetFlag] = useState(false);
  const { createProduct, isLoading } = useCreateProduct();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddProductFormData>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      name: "",
      price: "",
      inStock: false,
      image: null,
    },
  });

  const handleFileChange = (file: File) => {
    setValue("image", file);
  };

  const onSubmit: SubmitHandler<AddProductFormData> = (data) => {
    if (!data.image) {
      return toast.error("No selected image!");
    }

    createProduct(
      {
        name: data.name,
        price: Number(data.price),
        inStock: data.inStock,
        image: data.image,
      },
      {
        onSuccess: () => {
          setValue("image", new File([], ""));
          reset();
          setResetFlag(false);
          setTimeout(() => setResetFlag(true), 0);
        },
      }
    );
  };

  return (
    <div>
      <div className="pt-20"></div>
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
            resetFlag={resetFlag}
          />
          <Button
            className="my-4 w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <AiOutlineLoading className="mr-2 inline-block animate-spin" />
                Adding LEGO...
              </>
            ) : (
              "Add LEGO"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
