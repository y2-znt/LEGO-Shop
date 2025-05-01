import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type InputType<T extends FieldValues> = {
  id: keyof T;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

const Inputs = <T extends FieldValues>({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: InputType<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type || "text";
  };

  return (
    <div className="font relative m-auto py-2">
      <Label htmlFor={id as string}>{label}</Label>
      <Input
        autoComplete="off"
        id={id as string}
        disabled={disabled}
        // @ts-ignore
        {...register(id as string)}
        placeholder=""
        type={getInputType()}
        className={`w-full ${
          errors[id] ? "border-red-500" : "border-slate-300"
        }`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-0 bottom-[1.2rem] flex items-center pr-3 text-sm text-gray-500 ${
            errors[id] ? "mb-5" : ""
          }`}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      {errors[id] && (
        <p className="mt-1 text-xs font-semibold text-red-500">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Inputs;
