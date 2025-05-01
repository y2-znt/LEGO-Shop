"use client";

import { Label } from "@/components/ui/label";
import { AddProductFormData } from "@/schemas/add.schema";
import { UseFormRegister } from "react-hook-form";

export type CustomCheckBoxType = {
  id: string;
  register: UseFormRegister<AddProductFormData>;
  label: string;
  disabled?: boolean;
};

const CustomCheckBox: React.FC<CustomCheckBoxType> = ({
  id,
  register,
  label,
  disabled,
}) => {
  return (
    <div className="flex items-center gap-2 py-4">
      <input
        type="checkbox"
        id={id}
        {...register(id as keyof AddProductFormData)}
        disabled={disabled}
        className="size-4 rounded-md border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

export default CustomCheckBox;
