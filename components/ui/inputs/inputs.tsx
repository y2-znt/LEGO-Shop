import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../../../components/ui/shadcn/input";
import { Label } from "../../../components/ui/shadcn/label";

type inputType = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  validation?: object;
};

const Inputs: React.FC<inputType> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  validation = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type || "text";
  };

  return (
    <div className="font relative m-auto py-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required, ...validation })}
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
          className={`absolute bottom-[1.2rem] right-0 flex items-center pr-3 text-sm text-gray-500 ${
            errors[id] ? "mb-5" : ""
          }`}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      {errors[id] && (
        <p className="mt-1 text-xs font-semibold text-red-500">
          {errors[id]?.message?.toString() || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default Inputs;
