"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Inputs from "@/components/ui/inputs";
import { useState } from "react";

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <div>
        <div className="pt-20"></div>
        <div className="w-full max-sm:w-full m-auto"></div>
        <Card className="mx-auto max-w-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Add a product</CardTitle>
            <CardDescription>
              Enter the name, price and image to add the product
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Inputs
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
