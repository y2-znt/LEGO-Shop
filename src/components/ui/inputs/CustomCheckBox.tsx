"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

type CustomCheckBoxType = {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
};

export default function CustomCheckBox({
  id,
  label,
  disabled,
  register,
}: CustomCheckBoxType) {
  return (
    <div className="flex w-full flex-row gap-2 items-center py-6">
      <input
        type="checkbox"
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=""
        className="cursor-pointer"
      />
      <label htmlFor={id} className="cursor-pointer font-medium text-sm ">
        {label}
      </label>
    </div>
  );
}
