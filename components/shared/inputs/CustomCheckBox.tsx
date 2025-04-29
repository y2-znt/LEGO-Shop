"use client";

import { AddProductFormData } from "@/schemas/add.schema";
import { UseFormRegister } from "react-hook-form";

type CustomCheckBoxType = {
  id: string;
  label: string;
  // prettier-ignore
  register: UseFormRegister<AddProductFormData>;
};

export default function CustomCheckBox({ id, label }: CustomCheckBoxType) {
  return (
    <div className="flex w-full flex-row items-center gap-2 py-6">
      <input type="checkbox" id={id} className="cursor-pointer" />
      <label htmlFor={id} className="cursor-pointer text-sm font-medium">
        {label}
      </label>
    </div>
  );
}
